class WorkflowState < ApplicationRecord
  belongs_to :team
  has_many :issues, foreign_key: :state_id, dependent: :nullify

  enum state_type: { backlog: 0, unstarted: 1, started: 2, completed: 3, cancelled: 4 }

  validates :name, presence: true
  validates :color, presence: true
  validates :position, presence: true

  scope :ordered, -> { order(position: :asc) }
end
