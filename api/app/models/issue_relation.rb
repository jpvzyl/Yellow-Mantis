class IssueRelation < ApplicationRecord
  belongs_to :issue
  belongs_to :related_issue, class_name: "Issue"

  enum relation_type: { blocks: 0, is_blocked_by: 1, relates_to: 2, duplicate_of: 3 }

  validates :related_issue_id, uniqueness: { scope: [:issue_id, :relation_type] }
end
