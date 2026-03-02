class User < ApplicationRecord
  has_secure_password

  has_many :workspace_memberships, dependent: :destroy
  has_many :workspaces, through: :workspace_memberships
  has_many :team_memberships, dependent: :destroy
  has_many :teams, through: :team_memberships
  has_many :assigned_issues, class_name: "Issue", foreign_key: :assignee_id
  has_many :created_issues, class_name: "Issue", foreign_key: :creator_id
  has_many :comments, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :favorites, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true

  def generate_token
    JsonWebToken.encode(user_id: id)
  end

  def generate_refresh_token
    JsonWebToken.encode({ user_id: id, type: "refresh" }, 30.days.from_now)
  end
end
