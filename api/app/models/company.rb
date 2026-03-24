class Company < ApplicationRecord
  has_many :company_memberships, dependent: :destroy
  has_many :users, through: :company_memberships
  has_many :workspaces, dependent: :destroy

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true, format: { with: /\A[a-z0-9\-]+\z/ }

  before_validation :generate_slug, on: :create
  after_create :create_default_workspace

  private

  def generate_slug
    return if slug.present? || name.blank?
    base = name.parameterize
    candidate = base
    counter = 1
    while Company.exists?(slug: candidate)
      candidate = "#{base}-#{counter}"
      counter += 1
    end
    self.slug = candidate
  end

  def create_default_workspace
    return if workspaces.any?

    workspace = workspaces.create!(name: name)
    default_team = workspace.teams.create!(
      name: "Engineering",
      identifier: "ENG",
      color: "#6366f1"
    )

    company_memberships.includes(:user).find_each do |cm|
      WorkspaceMembership.find_or_create_by!(workspace: workspace, user: cm.user) do |wm|
        wm.role = cm.admin? ? :owner : :member
      end
      TeamMembership.find_or_create_by!(team: default_team, user: cm.user)
    end
  end
end
