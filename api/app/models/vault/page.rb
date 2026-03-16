module Vault
  class Page < ApplicationRecord
    self.table_name = "vault_pages"

    belongs_to :business, class_name: "Vault::Business", foreign_key: :vault_business_id

    CATEGORIES = %w[github heroku hosting analytics email social docs billing other].freeze

    validates :name, presence: true, length: { maximum: 100 }
    validates :url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) }
    validates :category, inclusion: { in: CATEGORIES }

    scope :ordered, -> { order(:position, :name) }
    scope :pinned, -> { where(pinned: true) }
  end
end
