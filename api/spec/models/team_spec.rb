require "rails_helper"

RSpec.describe Team, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:identifier) }

    it "requires uppercase letter identifier" do
      workspace = create(:workspace)
      team = build(:team, workspace: workspace, identifier: "abc")
      expect(team).not_to be_valid
      expect(team.errors[:identifier]).to include("must be 2-5 uppercase letters")
    end

    it "allows 2-5 uppercase letters" do
      workspace = create(:workspace)
      team = build(:team, workspace: workspace, identifier: "ENG")
      expect(team).to be_valid
    end

    it "enforces unique identifier per workspace" do
      workspace = create(:workspace)
      create(:team, workspace: workspace, identifier: "ENG")
      team = build(:team, workspace: workspace, identifier: "ENG")
      expect(team).not_to be_valid
    end
  end

  describe "associations" do
    it { should belong_to(:workspace) }
    it { should have_many(:issues).dependent(:destroy) }
    it { should have_many(:workflow_states).dependent(:destroy) }
    it { should have_many(:cycles).dependent(:destroy) }
    it { should have_many(:team_memberships).dependent(:destroy) }
    it { should have_many(:users).through(:team_memberships) }
  end

  describe "default workflow states" do
    it "creates 6 default workflow states on create" do
      workspace = create(:workspace)
      team = Team.create!(workspace: workspace, name: "Test", identifier: "TST")
      expect(team.workflow_states.count).to eq(6)
      types = team.workflow_states.pluck(:state_type)
      expect(types).to contain_exactly("backlog", "unstarted", "started", "in_review", "completed", "cancelled")
    end

    it "orders QA between In Progress and Done" do
      workspace = create(:workspace)
      team = Team.create!(workspace: workspace, name: "Test", identifier: "TST")
      ordered = team.workflow_states.order(:position).pluck(:name)
      expect(ordered).to eq(["Backlog", "Todo", "In Progress", "QA", "Done", "Cancelled"])
    end
  end

  describe "#next_issue_number" do
    it "returns 1 for team with no issues" do
      team = create(:team)
      expect(team.next_issue_number).to eq(1)
    end

    it "returns next sequential number" do
      team = create(:team)
      user = create(:user)
      create(:issue, team: team, creator: user)
      create(:issue, team: team, creator: user)
      expect(team.next_issue_number).to eq(3)
    end
  end
end
