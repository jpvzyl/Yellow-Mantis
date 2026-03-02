class Project < ApplicationRecord
  belongs_to :workspace
  belongs_to :lead, class_name: "User", optional: true
  has_many :issues, dependent: :nullify
  has_many :project_teams, dependent: :destroy
  has_many :teams, through: :project_teams
  has_many :documents, dependent: :nullify

  enum status: { planned: 0, in_progress: 1, paused: 2, completed: 3, cancelled: 4 }

  validates :name, presence: true

  def progress
    total = issues.count
    return 0 if total.zero?
    completed = issues.joins(:state).where(workflow_states: { state_type: :completed }).count
    (completed.to_f / total * 100).round
  end
end
