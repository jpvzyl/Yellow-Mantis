class View < ApplicationRecord
  belongs_to :workspace
  belongs_to :team, optional: true
  belongs_to :created_by, class_name: "User"

  enum layout: { list: 0, board: 1, timeline: 2 }

  validates :name, presence: true

  scope :shared, -> { where(shared: true) }
  scope :personal_for, ->(user) { where(created_by: user, shared: false) }
end
