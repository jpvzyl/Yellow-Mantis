class Document < ApplicationRecord
  belongs_to :workspace
  belongs_to :project, optional: true
  belongs_to :created_by, class_name: "User"

  validates :title, presence: true
end
