require "rails_helper"

RSpec.describe Workspace, type: :model do
  describe "validations" do
    it "requires a name" do
      ws = Workspace.new(name: nil)
      expect(ws).not_to be_valid
      expect(ws.errors[:name]).to include("can't be blank")
    end

    it "requires a slug" do
      ws = Workspace.new(name: nil, slug: nil)
      ws.valid?
      expect(ws.errors[:slug]).to include("can't be blank")
    end
  end

  describe "associations" do
    it { should have_many(:workspace_memberships).dependent(:destroy) }
    it { should have_many(:users).through(:workspace_memberships) }
    it { should have_many(:teams).dependent(:destroy) }
    it { should have_many(:labels).dependent(:destroy) }
    it { should have_many(:projects).dependent(:destroy) }
  end

  describe "slug generation" do
    it "auto-generates slug from name" do
      ws = Workspace.create!(name: "My Great Workspace")
      expect(ws.slug).to eq("my-great-workspace")
    end

    it "handles duplicate slugs" do
      Workspace.create!(name: "Test", slug: "test")
      ws2 = Workspace.create!(name: "Test")
      expect(ws2.slug).to eq("test-1")
    end

    it "validates slug format" do
      ws = build(:workspace, slug: "INVALID SLUG!")
      expect(ws).not_to be_valid
    end
  end

  describe "invite code" do
    it "generates invite code on create" do
      ws = Workspace.create!(name: "Invite Test")
      expect(ws.invite_code).to be_present
      expect(ws.invite_code.length).to eq(16)
    end
  end
end
