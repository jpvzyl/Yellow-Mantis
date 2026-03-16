module Api
  module V1
    module Vault
      class OauthController < BaseController
        skip_before_action :authenticate_user!, only: [:google_callback]

        def google_authorize
          business = current_user.vault_businesses.find(params[:business_id])

          state = JsonWebToken.encode(
            { user_id: current_user.id, business_id: business.id, type: "oauth_state" },
            15.minutes.from_now
          )

          oauth = ::Vault::GoogleOauthService.new
          url = oauth.authorization_url(state: state)

          render json: { authorization_url: url }
        end

        def google_callback
          state = JsonWebToken.decode(params[:state])
          unless state && state[:type] == "oauth_state"
            return redirect_to_frontend(error: "invalid_state")
          end

          user = User.find(state[:user_id])
          business = user.vault_businesses.find(state[:business_id])

          oauth = ::Vault::GoogleOauthService.new
          tokens = oauth.exchange_code(code: params[:code])
          user_info = oauth.fetch_user_info(access_token: tokens[:access_token])

          account = business.accounts.find_or_initialize_by(
            provider: "google",
            email: user_info[:email]
          )

          account.assign_attributes(
            display_name: user_info[:name],
            avatar_url: user_info[:picture],
            access_token: tokens[:access_token],
            refresh_token: tokens[:refresh_token],
            token_expires_at: tokens[:expires_at],
            token_scope: tokens[:scope],
            status: "active",
            last_synced_at: Time.current
          )

          account.save!

          ::Vault::AuditLog.record!(
            user: user,
            action: "account.link",
            business: business,
            resource: account,
            request: request,
            details: { email: account.email, provider: "google" }
          )

          redirect_to_frontend(
            business_id: business.id,
            account_email: account.email,
            success: true
          )
        rescue StandardError => e
          Rails.logger.error("Google OAuth callback error: #{e.message}")
          redirect_to_frontend(error: "oauth_failed")
        end

        def revoke
          business = current_user.vault_businesses.find(params[:business_id])
          account = business.accounts.find(params[:account_id])

          oauth = ::Vault::GoogleOauthService.new
          oauth.revoke_token(token: account.access_token) if account.access_token.present?

          account.update!(status: "revoked", access_token: nil, refresh_token: nil)

          ::Vault::AuditLog.record!(
            user: current_user,
            action: "account.revoke",
            business: business,
            resource: account,
            request: request,
            details: { email: account.email }
          )

          render json: { message: "Account revoked successfully" }
        end

        private

        def redirect_to_frontend(params = {})
          base = ENV.fetch("FRONTEND_URL", "http://localhost:5173")
          query = params.to_query
          redirect_to "#{base}/vault/oauth/callback?#{query}", allow_other_host: true
        end
      end
    end
  end
end
