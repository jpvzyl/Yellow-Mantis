class CompanyMembership < ApplicationRecord
  belongs_to :company
  belongs_to :user

  enum role: { member: 0, admin: 1 }

  validates :role, presence: true
  validates :user_id, uniqueness: { scope: :company_id }

  after_create :sync_workspace_memberships

  private

  def sync_workspace_memberships
    company.workspaces.each do |workspace|
      WorkspaceMembership.find_or_create_by!(workspace: workspace, user: user) do |wm|
        wm.role = admin? ? :admin : :member
      end
      workspace.teams.each do |team|
        TeamMembership.find_or_create_by!(team: team, user: user)
      end
    end
  end
end
