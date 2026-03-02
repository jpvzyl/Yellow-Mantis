require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:name) }
    it { should have_secure_password }

    it "validates email uniqueness" do
      create(:user, email: "taken@test.com")
      user = build(:user, email: "taken@test.com")
      expect(user).not_to be_valid
    end

    it "validates email format" do
      user = build(:user, email: "not-an-email")
      expect(user).not_to be_valid
    end

    it "downcases email is handled by controller" do
      user = create(:user, email: "Test@Example.com")
      expect(user.email).to eq("Test@Example.com")
    end
  end

  describe "associations" do
    it { should have_many(:workspace_memberships).dependent(:destroy) }
    it { should have_many(:workspaces).through(:workspace_memberships) }
    it { should have_many(:team_memberships).dependent(:destroy) }
    it { should have_many(:teams).through(:team_memberships) }
    it { should have_many(:assigned_issues) }
    it { should have_many(:created_issues) }
    it { should have_many(:comments).dependent(:destroy) }
    it { should have_many(:notifications).dependent(:destroy) }
    it { should have_many(:favorites).dependent(:destroy) }
  end

  describe "#generate_token" do
    it "returns a JWT token" do
      user = create(:user)
      token = user.generate_token
      expect(token).to be_a(String)
      decoded = JsonWebToken.decode(token)
      expect(decoded[:user_id]).to eq(user.id)
    end
  end

  describe "#generate_refresh_token" do
    it "returns a refresh JWT token" do
      user = create(:user)
      token = user.generate_refresh_token
      decoded = JsonWebToken.decode(token)
      expect(decoded[:user_id]).to eq(user.id)
      expect(decoded[:type]).to eq("refresh")
    end
  end
end
