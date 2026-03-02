require "rails_helper"

RSpec.describe Cycle, type: :model do
  describe "validations" do
    it { should validate_presence_of(:start_date) }
    it { should validate_presence_of(:end_date) }
  end

  describe "associations" do
    it { should belong_to(:team) }
    it { should have_many(:issues) }
  end

  describe "auto-numbering" do
    it "auto-increments cycle number per team" do
      team = create(:team)
      c1 = Cycle.create!(team: team, start_date: Date.today, end_date: Date.today + 14)
      c2 = Cycle.create!(team: team, start_date: Date.today + 15, end_date: Date.today + 28)

      expect(c1.number).to eq(1)
      expect(c2.number).to eq(2)
    end

    it "auto-generates name" do
      team = create(:team)
      c = Cycle.create!(team: team, start_date: Date.today, end_date: Date.today + 14)
      expect(c.name).to eq("Cycle 1")
    end
  end

  describe "date validation" do
    it "rejects end_date before start_date" do
      team = create(:team)
      c = Cycle.new(team: team, start_date: Date.today, end_date: Date.yesterday)
      expect(c).not_to be_valid
      expect(c.errors[:end_date]).to include("must be after start date")
    end
  end

  describe "enums" do
    it "supports all status values" do
      expect(Cycle.statuses.keys).to contain_exactly("upcoming", "active", "completed")
    end
  end
end
