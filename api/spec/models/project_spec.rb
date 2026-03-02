require "rails_helper"

RSpec.describe Project, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
  end

  describe "associations" do
    it { should belong_to(:workspace) }
    it { should belong_to(:lead).optional }
    it { should have_many(:issues) }
    it { should have_many(:project_teams).dependent(:destroy) }
    it { should have_many(:teams).through(:project_teams) }
  end

  describe "enums" do
    it "supports all status values" do
      expect(Project.statuses.keys).to contain_exactly(
        "planned", "in_progress", "paused", "completed", "cancelled"
      )
    end
  end

  describe "#progress" do
    let(:workspace) { create(:workspace) }
    let(:team) { create(:team, workspace: workspace) }
    let(:user) { create(:user) }
    let(:project) { create(:project, workspace: workspace) }

    it "returns 0 for project with no issues" do
      expect(project.progress).to eq(0)
    end

    it "calculates percentage of completed issues" do
      done_state = team.workflow_states.find_by(state_type: :completed)
      todo_state = team.workflow_states.find_by(state_type: :unstarted)

      create(:issue, team: team, creator: user, project: project, state: done_state)
      create(:issue, team: team, creator: user, project: project, state: done_state)
      create(:issue, team: team, creator: user, project: project, state: todo_state)
      create(:issue, team: team, creator: user, project: project, state: todo_state)

      expect(project.progress).to eq(50)
    end
  end
end
