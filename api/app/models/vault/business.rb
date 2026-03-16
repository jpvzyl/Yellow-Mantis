module Vault
  class Business < ApplicationRecord
    self.table_name = "vault_businesses"

    belongs_to :user
    has_many :accounts, class_name: "Vault::Account", foreign_key: :vault_business_id, dependent: :destroy
    has_many :pages, class_name: "Vault::Page", foreign_key: :vault_business_id, dependent: :destroy
    has_many :documents, class_name: "Vault::Document", foreign_key: :vault_business_id, dependent: :destroy
    has_many :audit_logs, class_name: "Vault::AuditLog", foreign_key: :vault_business_id, dependent: :destroy
    has_many :cursor_chats, class_name: "Vault::CursorChat", foreign_key: :vault_business_id, dependent: :nullify

    validates :name, presence: true, length: { maximum: 100 }
    validates :slug, presence: true, uniqueness: { scope: :user_id }, format: { with: /\A[a-z0-9\-]+\z/ }
    validates :color, format: { with: /\A#[0-9a-fA-F]{6}\z/, allow_blank: true }
    validates :website_url, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), allow_blank: true }

    before_validation :generate_slug, on: :create

    scope :active, -> { where(archived: false) }
    scope :ordered, -> { order(:position, :name) }

    private

    def generate_slug
      return if slug.present? || name.blank?
      base = name.parameterize
      candidate = base
      counter = 1
      while self.class.exists?(user_id: user_id, slug: candidate)
        candidate = "#{base}-#{counter}"
        counter += 1
      end
      self.slug = candidate
    end
  end
end
