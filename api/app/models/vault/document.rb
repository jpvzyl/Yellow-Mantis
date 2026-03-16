module Vault
  class Document < ApplicationRecord
    self.table_name = "vault_documents"

    belongs_to :business, class_name: "Vault::Business", foreign_key: :vault_business_id
    belongs_to :uploaded_by, class_name: "User"

    has_one_attached :file

    CATEGORIES = %w[general contract invoice credential legal compliance tax marketing other].freeze
    MAX_FILE_SIZE = 50.megabytes

    validates :name, presence: true, length: { maximum: 255 }
    validates :category, inclusion: { in: CATEGORIES }
    validate :file_size_validation, if: -> { file.attached? }
    validate :file_type_validation, if: -> { file.attached? }

    scope :ordered, -> { order(created_at: :desc) }
    scope :sensitive_only, -> { where(sensitive: true) }
    scope :by_category, ->(cat) { where(category: cat) }

    ALLOWED_CONTENT_TYPES = %w[
      application/pdf
      application/msword
      application/vnd.openxmlformats-officedocument.wordprocessingml.document
      application/vnd.ms-excel
      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      application/vnd.ms-powerpoint
      application/vnd.openxmlformats-officedocument.presentationml.presentation
      text/plain
      text/csv
      image/jpeg
      image/png
      image/gif
      image/webp
      application/zip
      application/json
    ].freeze

    private

    def file_size_validation
      if file.blob.byte_size > MAX_FILE_SIZE
        errors.add(:file, "is too large (max #{MAX_FILE_SIZE / 1.megabyte}MB)")
      end
    end

    def file_type_validation
      unless ALLOWED_CONTENT_TYPES.include?(file.blob.content_type)
        errors.add(:file, "type not allowed")
      end
    end
  end
end
