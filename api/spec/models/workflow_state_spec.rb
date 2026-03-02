require "rails_helper"

RSpec.describe WorkflowState, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:color) }
    it { should validate_presence_of(:position) }
  end

  describe "associations" do
    it { should belong_to(:team) }
    it { should have_many(:issues) }
  end

  describe "enums" do
    it "supports all state types" do
      expect(WorkflowState.state_types.keys).to contain_exactly(
        "backlog", "unstarted", "started", "completed", "cancelled"
      )
    end
  end

  describe ".ordered" do
    it "orders by position ascending" do
      team = create(:team)
      states = team.workflow_states.ordered
      positions = states.pluck(:position)
      expect(positions).to eq(positions.sort)
    end
  end
end
