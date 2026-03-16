module Vault
  class Account < ApplicationRecord
    self.table_name = "vault_accounts"

    belongs_to :business, class_name: "Vault::Business", foreign_key: :vault_business_id

    encrypts :access_token_ciphertext, deterministic: false
    encrypts :refresh_token_ciphertext, deterministic: false

    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :provider, presence: true, inclusion: { in: %w[google] }
    validates :email, uniqueness: { scope: [:vault_business_id, :provider] }
    validates :status, inclusion: { in: %w[active expired revoked error] }

    scope :active, -> { where(status: "active") }
    scope :google, -> { where(provider: "google") }

    def token_expired?
      token_expires_at.present? && token_expires_at < Time.current
    end

    def access_token
      access_token_ciphertext
    end

    def access_token=(value)
      self.access_token_ciphertext = value
    end

    def refresh_token
      refresh_token_ciphertext
    end

    def refresh_token=(value)
      self.refresh_token_ciphertext = value
    end
  end
end
