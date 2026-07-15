class Team < ApplicationRecord
  belongs_to :workspace
  has_many :team_memberships, dependent: :destroy
  has_many :users, through: :team_memberships
  has_many :issues, dependent: :destroy
  has_many :workflow_states, -> { order(position: :asc) }, dependent: :destroy
  has_many :cycles, dependent: :destroy

  validates :name, presence: true
  validates :identifier, presence: true, uniqueness: { scope: :workspace_id },
    format: { with: /\A[A-Z]{2,5}\z/, message: "must be 2-5 uppercase letters" }

  after_create :create_default_workflow_states

  def next_issue_number
    (issues.maximum(:number) || 0) + 1
  end

  private

  def create_default_workflow_states
    [
      { name: "Backlog", color: "#bec2c8", position: 0, state_type: :backlog },
      { name: "Todo", color: "#e2e2e2", position: 1, state_type: :unstarted },
      { name: "In Progress", color: "#f2c94c", position: 2, state_type: :started },
      { name: "QA", color: "#a855f7", position: 3, state_type: :in_review },
      { name: "Done", color: "#4cb782", position: 4, state_type: :completed },
      { name: "Cancelled", color: "#95a2b3", position: 5, state_type: :cancelled }
    ].each { |attrs| workflow_states.create!(attrs) }
  end
end
