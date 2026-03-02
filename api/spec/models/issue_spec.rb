require "rails_helper"

RSpec.describe Issue, type: :model do
  let(:workspace) { create(:workspace) }
  let(:team) { create(:team, workspace: workspace, identifier: "ENG") }
  let(:user) { create(:user) }

  describe "validations" do
    it { should validate_presence_of(:title) }
    it { should belong_to(:team) }
    it { should belong_to(:creator) }
    it { should belong_to(:state) }
  end

  describe "auto-numbering" do
    it "auto-increments issue number per team" do
      i1 = create(:issue, team: team, creator: user)
      i2 = create(:issue, team: team, creator: user)

      expect(i1.number).to eq(1)
      expect(i2.number).to eq(2)
    end

    it "generates identifier from team prefix and number" do
      issue = create(:issue, team: team, creator: user)
      expect(issue.identifier).to eq("ENG-1")
    end

    it "numbers independently per team" do
      team2 = create(:team, workspace: workspace, identifier: "DES")
      i1 = create(:issue, team: team, creator: user)
      i2 = create(:issue, team: team2, creator: user)

      expect(i1.identifier).to eq("ENG-1")
      expect(i2.identifier).to eq("DES-1")
    end
  end

  describe "priority" do
    it "has correct priority labels" do
      issue = build(:issue, priority: 1)
      expect(issue.priority_label).to eq("Urgent")

      issue.priority = 4
      expect(issue.priority_label).to eq("Low")
    end
  end

  describe "associations" do
    it "supports sub-issues" do
      parent = create(:issue, team: team, creator: user)
      child = create(:issue, team: team, creator: user, parent: parent)

      expect(parent.sub_issues).to include(child)
      expect(child.parent).to eq(parent)
    end

    it "supports labels" do
      label = create(:label, workspace: workspace)
      issue = create(:issue, team: team, creator: user)
      IssueLabel.create!(issue: issue, label: label)

      expect(issue.labels).to include(label)
    end
  end
end
