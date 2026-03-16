require "google/apis/gmail_v1"

module Vault
  class GmailService
    PER_PAGE = 20

    def initialize(account)
      @account = account
      @service = Google::Apis::GmailV1::GmailService.new
      @service.authorization = build_credentials
    end

    def fetch_messages(page_token: nil, query: nil, label_ids: ["INBOX"])
      ensure_valid_token!

      result = @service.list_user_messages(
        "me",
        max_results: PER_PAGE,
        page_token: page_token,
        q: query,
        label_ids: label_ids
      )

      messages = (result.messages || []).map do |msg|
        fetch_message_summary(msg.id)
      end.compact

      {
        messages: messages,
        next_page_token: result.next_page_token,
        result_size_estimate: result.result_size_estimate
      }
    end

    def fetch_message(message_id)
      ensure_valid_token!

      msg = @service.get_user_message("me", message_id, format: "full")
      parse_full_message(msg)
    end

    def fetch_labels
      ensure_valid_token!

      result = @service.list_user_labels("me")
      (result.labels || []).map do |label|
        {
          id: label.id,
          name: label.name,
          type: label.type,
          messages_total: label.messages_total,
          messages_unread: label.messages_unread
        }
      end
    end

    def mark_as_read(message_id)
      ensure_valid_token!

      modify = Google::Apis::GmailV1::ModifyMessageRequest.new(remove_label_ids: ["UNREAD"])
      @service.modify_message("me", message_id, modify)
    end

    def archive_message(message_id)
      ensure_valid_token!

      modify = Google::Apis::GmailV1::ModifyMessageRequest.new(remove_label_ids: ["INBOX"])
      @service.modify_message("me", message_id, modify)
    end

    def send_message(to:, subject:, body:, thread_id: nil)
      ensure_valid_token!

      message = build_raw_message(to: to, subject: subject, body: body)
      gmail_message = Google::Apis::GmailV1::Message.new(raw: message, thread_id: thread_id)
      @service.send_user_message("me", gmail_message)
    end

    private

    def ensure_valid_token!
      return unless @account.token_expired?

      oauth = Vault::GoogleOauthService.new
      tokens = oauth.refresh_access_token(refresh_token: @account.refresh_token)
      @account.update!(
        access_token: tokens[:access_token],
        token_expires_at: tokens[:expires_at]
      )
      @service.authorization = build_credentials
    end

    def build_credentials
      Google::Auth::UserRefreshCredentials.new(
        client_id: ENV.fetch("GOOGLE_CLIENT_ID", Rails.application.credentials.dig(:google, :client_id)),
        client_secret: ENV.fetch("GOOGLE_CLIENT_SECRET", Rails.application.credentials.dig(:google, :client_secret)),
        refresh_token: @account.refresh_token,
        scope: Vault::GoogleOauthService::SCOPES
      ).tap do |cred|
        cred.access_token = @account.access_token
        cred.expires_at = @account.token_expires_at
      end
    end

    def fetch_message_summary(message_id)
      msg = @service.get_user_message("me", message_id, format: "metadata", metadata_headers: ["From", "To", "Subject", "Date"])
      headers = msg.payload&.headers || []

      {
        id: msg.id,
        thread_id: msg.thread_id,
        snippet: msg.snippet,
        label_ids: msg.label_ids || [],
        from: extract_header(headers, "From"),
        to: extract_header(headers, "To"),
        subject: extract_header(headers, "Subject"),
        date: extract_header(headers, "Date"),
        is_unread: msg.label_ids&.include?("UNREAD") || false,
        is_starred: msg.label_ids&.include?("STARRED") || false
      }
    rescue Google::Apis::ClientError
      nil
    end

    def parse_full_message(msg)
      headers = msg.payload&.headers || []
      body = extract_body(msg.payload)

      {
        id: msg.id,
        thread_id: msg.thread_id,
        snippet: msg.snippet,
        label_ids: msg.label_ids || [],
        from: extract_header(headers, "From"),
        to: extract_header(headers, "To"),
        subject: extract_header(headers, "Subject"),
        date: extract_header(headers, "Date"),
        cc: extract_header(headers, "Cc"),
        bcc: extract_header(headers, "Bcc"),
        body_html: body[:html],
        body_text: body[:text],
        is_unread: msg.label_ids&.include?("UNREAD") || false,
        is_starred: msg.label_ids&.include?("STARRED") || false,
        attachments: extract_attachments(msg.payload)
      }
    end

    def extract_header(headers, name)
      headers.find { |h| h.name == name }&.value
    end

    def extract_body(payload)
      result = { html: nil, text: nil }
      return result unless payload

      if payload.mime_type == "text/html"
        result[:html] = decode_body(payload.body&.data)
      elsif payload.mime_type == "text/plain"
        result[:text] = decode_body(payload.body&.data)
      end

      (payload.parts || []).each do |part|
        if part.mime_type == "text/html" && result[:html].nil?
          result[:html] = decode_body(part.body&.data)
        elsif part.mime_type == "text/plain" && result[:text].nil?
          result[:text] = decode_body(part.body&.data)
        elsif part.parts
          nested = extract_body(part)
          result[:html] ||= nested[:html]
          result[:text] ||= nested[:text]
        end
      end

      result
    end

    def decode_body(data)
      return nil unless data
      Base64.urlsafe_decode64(data).force_encoding("UTF-8")
    rescue StandardError
      data
    end

    def extract_attachments(payload)
      attachments = []
      return attachments unless payload&.parts

      payload.parts.each do |part|
        next unless part.filename.present? && part.body&.attachment_id

        attachments << {
          id: part.body.attachment_id,
          filename: part.filename,
          mime_type: part.mime_type,
          size: part.body.size
        }
      end

      attachments
    end

    def build_raw_message(to:, subject:, body:)
      message = <<~MESSAGE
        From: #{@account.email}
        To: #{to}
        Subject: #{subject}
        Content-Type: text/html; charset=UTF-8

        #{body}
      MESSAGE
      Base64.urlsafe_encode64(message.strip)
    end
  end
end
