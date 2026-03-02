class WorkspaceMembership < ApplicationRecord
  belongs_to :workspace
  belongs_to :user

  enum role: { guest: 0, member: 1, admin: 2, owner: 3 }

  validates :role, presence: true
  validates :user_id, uniqueness: { scope: :workspace_id }
end
