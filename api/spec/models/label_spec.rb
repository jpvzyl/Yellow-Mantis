require "rails_helper"

RSpec.describe Label, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:color) }
  end

  describe "associations" do
    it { should belong_to(:workspace) }
    it { should belong_to(:parent_label).optional }
    it { should have_many(:child_labels) }
    it { should have_many(:issue_labels).dependent(:destroy) }
    it { should have_many(:issues).through(:issue_labels) }
  end

  describe "parent/child labels" do
    it "supports label grouping" do
      workspace = create(:workspace)
      parent = create(:label, workspace: workspace, name: "Type")
      child = create(:label, workspace: workspace, name: "Bug", parent_label: parent)

      expect(parent.child_labels).to include(child)
      expect(child.parent_label).to eq(parent)
    end
  end
end
