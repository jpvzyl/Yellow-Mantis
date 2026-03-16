module Vault
  class CursorChatService
    CURSOR_PROJECTS_DIR = File.expand_path("~/.cursor/projects")

    def initialize(user)
      @user = user
    end

    def scan_all_projects
      return [] unless Dir.exist?(CURSOR_PROJECTS_DIR)

      projects = []
      Dir.children(CURSOR_PROJECTS_DIR).each do |project_dir|
        transcripts_path = File.join(CURSOR_PROJECTS_DIR, project_dir, "agent-transcripts")
        next unless Dir.exist?(transcripts_path)

        project_name = humanize_project_name(project_dir)
        chat_dirs = Dir.children(transcripts_path).select do |entry|
          full = File.join(transcripts_path, entry)
          File.directory?(full) && entry.match?(/\A[0-9a-f]{8}-/)
        end

        chat_dirs.each do |chat_dir|
          jsonl_file = File.join(transcripts_path, chat_dir, "#{chat_dir}.jsonl")
          next unless File.exist?(jsonl_file)

          projects << {
            chat_uuid: chat_dir,
            project_name: project_name,
            project_dir: project_dir,
            source_path: jsonl_file,
            file_size: File.size(jsonl_file),
            modified_at: File.mtime(jsonl_file),
          }
        end

        txt_files = Dir.children(transcripts_path).select { |f| f.end_with?(".txt") }
        txt_files.each do |txt|
          uuid = txt.delete_suffix(".txt")
          next if projects.any? { |p| p[:chat_uuid] == uuid }
        end
      end

      projects.sort_by { |p| p[:modified_at] }.reverse
    end

    def import_chat(chat_uuid:, source_path:, project_name:, file_size: 0)
      return nil unless File.exist?(source_path)

      lines = File.readlines(source_path)
      messages = lines.filter_map { |line| JSON.parse(line) rescue nil }

      title = derive_title(messages)
      summary = derive_summary(messages)
      message_count = messages.size

      first_msg_time = extract_earliest_time(source_path)
      last_msg_time = File.mtime(source_path)

      chat = @user.vault_cursor_chats.find_or_initialize_by(chat_uuid: chat_uuid)
      chat.assign_attributes(
        project_name: project_name,
        title: title,
        summary: summary,
        source_path: source_path,
        message_count: message_count,
        file_size: file_size.positive? ? file_size : File.size(source_path),
        chat_started_at: first_msg_time,
        chat_ended_at: last_msg_time,
        metadata: {
          has_subagents: Dir.exist?(File.join(File.dirname(source_path), "subagents")),
          roles: messages.map { |m| m["role"] }.tally,
        }
      )
      chat.save!
      chat
    end

    def read_chat_messages(chat)
      return [] unless chat.source_path && File.exist?(chat.source_path)

      lines = File.readlines(chat.source_path)
      messages = []

      lines.each_with_index do |line, idx|
        parsed = JSON.parse(line) rescue next
        role = parsed["role"]
        content_blocks = parsed.dig("message", "content") || []

        text_parts = content_blocks.select { |c| c["type"] == "text" }.map { |c| c["text"] }
        full_text = text_parts.join("\n")

        clean_text = strip_system_tags(full_text)
        next if clean_text.blank?

        messages << {
          index: idx,
          role: role,
          text: clean_text,
          has_tool_calls: content_blocks.any? { |c| c["type"] == "tool_use" || c["type"] == "tool_result" },
        }
      end

      messages
    end

    private

    def derive_title(messages)
      first_user = messages.find { |m| m["role"] == "user" }
      return "Untitled Chat" unless first_user

      content = first_user.dig("message", "content") || []
      text = content.select { |c| c["type"] == "text" }.map { |c| c["text"] }.join(" ")
      clean = strip_system_tags(text).strip

      return "Untitled Chat" if clean.blank?

      first_line = clean.lines.first&.strip || clean
      first_line.truncate(200)
    end

    def derive_summary(messages)
      user_messages = messages.select { |m| m["role"] == "user" }
      return nil if user_messages.empty?

      texts = user_messages.first(3).map do |m|
        content = m.dig("message", "content") || []
        content.select { |c| c["type"] == "text" }.map { |c| c["text"] }.join(" ")
      end

      combined = texts.join(" ")
      clean = strip_system_tags(combined).squish
      clean.truncate(500)
    end

    def strip_system_tags(text)
      text
        .gsub(/<user_query>\s*/m, "")
        .gsub(%r{</user_query>\s*}m, "")
        .gsub(/<system_reminder>.*?<\/system_reminder>/m, "")
        .gsub(/<attached_files>.*?<\/attached_files>/m, "")
        .gsub(/<open_and_recently_viewed_files>.*?<\/open_and_recently_viewed_files>/m, "")
        .gsub(/<user_info>.*?<\/user_info>/m, "")
        .gsub(/<git_status>.*?<\/git_status>/m, "")
        .gsub(/<agent_transcripts>.*?<\/agent_transcripts>/m, "")
        .gsub(/<rules>.*?<\/rules>/m, "")
        .gsub(/<agent_skills>.*?<\/agent_skills>/m, "")
        .gsub(/<task_notification>.*?<\/task_notification>/m, "")
        .gsub(/<external_links>.*?<\/external_links>/m, "")
        .gsub(/<mcp_file_system>.*?<\/mcp_file_system>/m, "")
        .gsub(/<[a-z_]+>.*?<\/[a-z_]+>/m, "")
        .gsub(/\[Image\]/, "")
        .gsub(/\[File:.*?\]/, "")
        .strip
    end

    def extract_earliest_time(source_path)
      File.birthtime(source_path)
    rescue
      File.mtime(source_path) - 1.hour
    end

    def humanize_project_name(dir_name)
      dir_name
        .gsub(/^Users-\w+-/, "")
        .gsub(/^Workspaces-/, "")
        .gsub(/^Library-Application-Support-Cursor-Workspaces-\d+-workspace-json$/, "Cursor Workspace")
        .tr("-", " ")
        .gsub(/\s+/, " ")
        .strip
    end
  end
end
