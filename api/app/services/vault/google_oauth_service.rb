module Vault
  class GoogleOauthService
    SCOPES = [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ].freeze

    def initialize
      @client_id = credentials[:client_id]
      @client_secret = credentials[:client_secret]
      @redirect_uri = credentials[:redirect_uri] || "#{ENV.fetch('API_BASE_URL', 'http://localhost:3000')}/api/v1/vault/oauth/google/callback"
    end

    def authorization_url(state:)
      client = build_client
      client.update!(
        scope: SCOPES.join(" "),
        state: state,
        redirect_uri: @redirect_uri,
        additional_parameters: {
          access_type: "offline",
          prompt: "consent",
          include_granted_scopes: "true"
        }
      )
      client.authorization_uri.to_s
    end

    def exchange_code(code:)
      client = build_client
      client.code = code
      client.redirect_uri = @redirect_uri
      client.fetch_access_token!

      {
        access_token: client.access_token,
        refresh_token: client.refresh_token,
        expires_at: Time.at(client.issued_at.to_i + client.expires_in.to_i),
        scope: client.scope&.join(" ")
      }
    end

    def refresh_access_token(refresh_token:)
      client = build_client
      client.refresh_token = refresh_token
      client.fetch_access_token!

      {
        access_token: client.access_token,
        expires_at: Time.at(client.issued_at.to_i + client.expires_in.to_i)
      }
    end

    def fetch_user_info(access_token:)
      uri = URI("https://www.googleapis.com/oauth2/v2/userinfo")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(uri)
      request["Authorization"] = "Bearer #{access_token}"
      response = http.request(request)
      JSON.parse(response.body).symbolize_keys
    end

    def revoke_token(token:)
      uri = URI("https://oauth2.googleapis.com/revoke?token=#{token}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Post.new(uri)
      request["Content-Type"] = "application/x-www-form-urlencoded"
      http.request(request)
    end

    private

    def build_client
      Signet::OAuth2::Client.new(
        client_id: @client_id,
        client_secret: @client_secret,
        authorization_uri: "https://accounts.google.com/o/oauth2/auth",
        token_credential_uri: "https://oauth2.googleapis.com/token"
      )
    end

    def credentials
      @credentials ||= {
        client_id: ENV.fetch("GOOGLE_CLIENT_ID", Rails.application.credentials.dig(:google, :client_id)),
        client_secret: ENV.fetch("GOOGLE_CLIENT_SECRET", Rails.application.credentials.dig(:google, :client_secret)),
        redirect_uri: ENV["GOOGLE_REDIRECT_URI"]
      }.compact
    end
  end
end
