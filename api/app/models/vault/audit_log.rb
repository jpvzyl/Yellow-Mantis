module Vault
  class AuditLog < ApplicationRecord
    self.table_name = "vault_audit_logs"

    belongs_to :user
    belongs_to :business, class_name: "Vault::Business", foreign_key: :vault_business_id, optional: true

    validates :action, presence: true

    scope :recent, -> { order(created_at: :desc) }
    scope :for_business, ->(business_id) { where(vault_business_id: business_id) }

    ACTIONS = %w[
      business.create business.update business.delete business.archive
      account.link account.unlink account.refresh account.revoke
      page.create page.update page.delete
      document.upload document.download document.delete
      gmail.view gmail.read gmail.send
      session.login session.logout
    ].freeze

    def self.record!(user:, action:, business: nil, resource: nil, request: nil, details: {})
      create!(
        user: user,
        vault_business: business,
        action: action,
        resource_type: resource&.class&.name,
        resource_id: resource&.id,
        ip_address: request&.remote_ip,
        user_agent: request&.user_agent&.truncate(500),
        details: details
      )
    end
  end
end
