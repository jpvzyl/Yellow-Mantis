class Issue < ApplicationRecord
  include PgSearch::Model

  belongs_to :team
  belongs_to :state, class_name: "WorkflowState"
  belongs_to :assignee, class_name: "User", optional: true
  belongs_to :creator, class_name: "User"
  belongs_to :project, optional: true
  belongs_to :cycle, optional: true
  belongs_to :parent, class_name: "Issue", optional: true

  has_many :sub_issues, class_name: "Issue", foreign_key: :parent_id, dependent: :nullify
  has_many :issue_labels, dependent: :destroy
  has_many :labels, through: :issue_labels
  has_many :comments, -> { order(created_at: :asc) }, dependent: :destroy
  has_many :activities, class_name: "IssueActivity", dependent: :destroy
  has_many :issue_relations, dependent: :destroy

  validates :title, presence: true
  validates :number, presence: true, uniqueness: { scope: :team_id }
  validates :priority, inclusion: { in: 0..4 }

  before_validation :set_number, on: :create
  before_validation :set_identifier, on: :create
  after_update :track_changes

  pg_search_scope :search, against: [:title, :identifier], using: { tsearch: { prefix: true } }

  scope :ordered, -> { order(sort_order: :asc, created_at: :desc) }

  PRIORITY_LABELS = { 0 => "No priority", 1 => "Urgent", 2 => "High", 3 => "Medium", 4 => "Low" }.freeze

  def priority_label
    PRIORITY_LABELS[priority]
  end

  private

  def set_number
    self.number ||= team&.next_issue_number
  end

  def set_identifier
    self.identifier = "#{team&.identifier}-#{number}" if team && number
  end

  def track_changes
    trackable_fields = %w[title state_id priority assignee_id project_id cycle_id parent_id estimate due_date]

    saved_changes.slice(*trackable_fields).each do |field, (old_val, new_val)|
      activities.create!(
        user: Current.user,
        field: field,
        old_value: old_val.to_s,
        new_value: new_val.to_s
      )
    end
  end
end
