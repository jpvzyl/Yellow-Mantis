module Api
  module V1
    module Vault
      class GmailController < BaseController
        before_action :set_account

        def messages
          gmail = ::Vault::GmailService.new(@account)
          result = gmail.fetch_messages(
            page_token: params[:page_token],
            query: params[:q],
            label_ids: params[:label_ids] || ["INBOX"]
          )

          audit!("gmail.view", resource: @account, details: { query: params[:q] })

          render json: result
        end

        def show_message
          gmail = ::Vault::GmailService.new(@account)
          message = gmail.fetch_message(params[:message_id])

          audit!("gmail.read", resource: @account, details: { message_id: params[:message_id] })

          render json: message
        end

        def labels
          gmail = ::Vault::GmailService.new(@account)
          render json: gmail.fetch_labels
        end

        def mark_read
          gmail = ::Vault::GmailService.new(@account)
          gmail.mark_as_read(params[:message_id])
          head :no_content
        end

        def archive
          gmail = ::Vault::GmailService.new(@account)
          gmail.archive_message(params[:message_id])
          head :no_content
        end

        def send_message
          gmail = ::Vault::GmailService.new(@account)
          result = gmail.send_message(
            to: params.require(:to),
            subject: params.require(:subject),
            body: params.require(:body),
            thread_id: params[:thread_id]
          )

          audit!("gmail.send", resource: @account, details: { to: params[:to], subject: params[:subject] })

          render json: { id: result.id, thread_id: result.thread_id }
        end

        private

        def set_account
          business = current_user.vault_businesses.find(params[:business_id])
          @current_business = business
          @account = business.accounts.active.google.find(params[:account_id])
        end
      end
    end
  end
end
