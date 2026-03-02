class Workspace < ApplicationRecord
  has_many :workspace_memberships, dependent: :destroy
  has_many :users, through: :workspace_memberships
  has_many :teams, dependent: :destroy
  has_many :labels, dependent: :destroy
  has_many :projects, dependent: :destroy
  has_many :documents, dependent: :destroy
  has_many :views, dependent: :destroy

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true, format: { with: /\A[a-z0-9\-]+\z/ }

  before_validation :generate_slug, on: :create
  before_create :generate_invite_code

  private

  def generate_slug
    return if slug.present? || name.blank?
    base = name.parameterize
    candidate = base
    counter = 1
    while Workspace.exists?(slug: candidate)
      candidate = "#{base}-#{counter}"
      counter += 1
    end
    self.slug = candidate
  end

  def generate_invite_code
    self.invite_code = SecureRandom.hex(8)
  end
end
