class Label < ApplicationRecord
  belongs_to :workspace
  belongs_to :parent_label, class_name: "Label", optional: true
  has_many :child_labels, class_name: "Label", foreign_key: :parent_label_id, dependent: :nullify
  has_many :issue_labels, dependent: :destroy
  has_many :issues, through: :issue_labels

  validates :name, presence: true
  validates :color, presence: true
end
