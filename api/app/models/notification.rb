class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :actor, class_name: "User", optional: true
  belongs_to :issue, optional: true

  enum notification_type: {
    issue_assigned: 0,
    issue_mentioned: 1,
    issue_commented: 2,
    issue_status_changed: 3,
    issue_updated: 4
  }

  scope :unread, -> { where(read_at: nil) }
  scope :recent, -> { order(created_at: :desc) }
end
