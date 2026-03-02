class IssueActivity < ApplicationRecord
  belongs_to :issue
  belongs_to :user, optional: true

  validates :field, presence: true
end
