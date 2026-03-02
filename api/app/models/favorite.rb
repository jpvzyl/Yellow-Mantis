class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :favoritable, polymorphic: true

  validates :favoritable_type, uniqueness: { scope: [:user_id, :favoritable_id] }

  scope :ordered, -> { order(position: :asc) }
end
