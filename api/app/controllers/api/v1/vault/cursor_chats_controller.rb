module Api
  module V1
    module Vault
      class CursorChatsController < BaseController
        before_action :set_chat, only: [:show, :messages, :assign, :star, :update]

        def index
          chats = current_user.vault_cursor_chats.ordered
          chats = chats.for_business(params[:business_id]) if params[:business_id].present?
          chats = chats.unassigned if params[:unassigned] == "true"
          chats = chats.starred if params[:starred] == "true"
          chats = chats.for_project(params[:project]) if params[:project].present?

          if params[:q].present?
            chats = chats.where("title ILIKE :q OR summary ILIKE :q OR project_name ILIKE :q", q: "%#{params[:q]}%")
          end

          chats = paginate_collection(chats, per: 30)
          render json: chats.map { |c| serialize(c) }
        end

        def show
          render json: serialize(@chat, detailed: true)
        end

        def messages
          service = ::Vault::CursorChatService.new(current_user)
          msgs = service.read_chat_messages(@chat)
          render json: { messages: msgs, total: msgs.size }
        end

        def scan
          service = ::Vault::CursorChatService.new(current_user)
          discovered = service.scan_all_projects

          existing_uuids = current_user.vault_cursor_chats.pluck(:chat_uuid)
          new_chats = discovered.reject { |d| existing_uuids.include?(d[:chat_uuid]) }

          render json: {
            total_discovered: discovered.size,
            already_imported: existing_uuids.size,
            new_available: new_chats.size,
            chats: discovered.map do |d|
              {
                chat_uuid: d[:chat_uuid],
                project_name: d[:project_name],
                source_path: d[:source_path],
                file_size: d[:file_size],
                modified_at: d[:modified_at],
                imported: existing_uuids.include?(d[:chat_uuid]),
              }
            end
          }
        end

        def import
          service = ::Vault::CursorChatService.new(current_user)

          chat_uuids = params[:chat_uuids] || []
          business_id = params[:business_id]

          if chat_uuids.blank? && params[:import_all]
            discovered = service.scan_all_projects
            chat_uuids = discovered.map { |d| d[:chat_uuid] }
          end

          discovered_map = service.scan_all_projects.index_by { |d| d[:chat_uuid] }

          imported = []
          chat_uuids.each do |uuid|
            info = discovered_map[uuid]
            next unless info

            chat = service.import_chat(
              chat_uuid: uuid,
              source_path: info[:source_path],
              project_name: info[:project_name],
              file_size: info[:file_size]
            )

            if business_id.present? && chat
              chat.update(vault_business_id: business_id)
            end

            imported << chat if chat
          end

          audit!("cursor_chat.import", details: { count: imported.size }) if imported.any?

          render json: { imported: imported.size, chats: imported.map { |c| serialize(c) } }
        end

        def sync
          service = ::Vault::CursorChatService.new(current_user)
          discovered = service.scan_all_projects

          updated = 0
          created = 0

          discovered.each do |info|
            existing = current_user.vault_cursor_chats.find_by(chat_uuid: info[:chat_uuid])

            if existing
              if File.mtime(info[:source_path]) > existing.updated_at
                service.import_chat(
                  chat_uuid: info[:chat_uuid],
                  source_path: info[:source_path],
                  project_name: info[:project_name],
                  file_size: info[:file_size]
                )
                updated += 1
              end
            else
              service.import_chat(
                chat_uuid: info[:chat_uuid],
                source_path: info[:source_path],
                project_name: info[:project_name],
                file_size: info[:file_size]
              )
              created += 1
            end
          end

          audit!("cursor_chat.sync", details: { created: created, updated: updated })

          render json: { created: created, updated: updated, total: current_user.vault_cursor_chats.count }
        end

        def assign
          business = params[:business_id].present? ? current_user.vault_businesses.find(params[:business_id]) : nil
          @chat.update!(vault_business_id: business&.id)
          @current_business = business

          audit!("cursor_chat.assign", resource: @chat, details: { business: business&.name })
          render json: serialize(@chat)
        end

        def star
          @chat.update!(starred: !@chat.starred)
          render json: serialize(@chat)
        end

        def update
          @chat.update!(update_params)
          render json: serialize(@chat)
        end

        def projects
          projects = current_user.vault_cursor_chats
            .select(:project_name)
            .distinct
            .where.not(project_name: nil)
            .pluck(:project_name)
            .sort

          render json: projects
        end

        private

        def set_chat
          @chat = current_user.vault_cursor_chats.find(params[:id])
        end

        def update_params
          params.require(:cursor_chat).permit(:title, :summary)
        end

        def serialize(chat, detailed: false)
          data = {
            id: chat.id,
            chat_uuid: chat.chat_uuid,
            project_name: chat.project_name,
            title: chat.title,
            summary: chat.summary,
            message_count: chat.message_count,
            file_size: chat.file_size,
            starred: chat.starred,
            business_id: chat.vault_business_id,
            chat_started_at: chat.chat_started_at,
            chat_ended_at: chat.chat_ended_at,
            created_at: chat.created_at,
            updated_at: chat.updated_at,
          }

          if detailed
            data[:source_path] = chat.source_path
            data[:metadata] = chat.metadata
            business = chat.business
            data[:business] = business ? { id: business.id, name: business.name, color: business.color } : nil
          end

          data
        end
      end
    end
  end
end
