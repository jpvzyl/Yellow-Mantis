class Cycle < ApplicationRecord
  belongs_to :team
  has_many :issues, dependent: :nullify

  enum status: { upcoming: 0, active: 1, completed: 2 }

  validates :number, presence: true, uniqueness: { scope: :team_id }
  validates :start_date, presence: true
  validates :end_date, presence: true
  validate :end_date_after_start_date

  before_validation :set_number, on: :create
  before_validation :set_name, on: :create

  private

  def set_number
    self.number ||= (team&.cycles&.maximum(:number) || 0) + 1
  end

  def set_name
    self.name ||= "Cycle #{number}"
  end

  def end_date_after_start_date
    return unless start_date && end_date
    errors.add(:end_date, "must be after start date") if end_date <= start_date
  end
end
