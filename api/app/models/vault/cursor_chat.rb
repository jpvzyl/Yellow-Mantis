module Vault
  class CursorChat < ApplicationRecord
    self.table_name = "vault_cursor_chats"

    belongs_to :user
    belongs_to :business, class_name: "Vault::Business", foreign_key: :vault_business_id, optional: true

    validates :chat_uuid, presence: true, uniqueness: { scope: :user_id }
    validates :title, length: { maximum: 500 }

    scope :ordered, -> { order(chat_started_at: :desc) }
    scope :starred, -> { where(starred: true) }
    scope :unassigned, -> { where(vault_business_id: nil) }
    scope :for_business, ->(business_id) { where(vault_business_id: business_id) }
    scope :for_project, ->(name) { where(project_name: name) }
  end
end
