require "rails_helper"

RSpec.describe "Api::V1::Teams", type: :request do
  let(:user) { create(:user) }
  let(:workspace) { create(:workspace) }
  let!(:membership) { create(:workspace_membership, user: user, workspace: workspace, role: :owner) }
  let(:headers) { auth_headers_with_workspace(user, workspace) }

  describe "GET /api/v1/:workspace_slug/teams" do
    before do
      create(:team, workspace: workspace, name: "Engineering", identifier: "ENG")
      create(:team, workspace: workspace, name: "Design", identifier: "DES")
    end

    it "returns all teams" do
      get "/api/v1/#{workspace.slug}/teams", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
      expect(json.map { |t| t["identifier"] }).to contain_exactly("ENG", "DES")
    end
  end

  describe "GET /api/v1/:workspace_slug/teams/:id (show)" do
    let!(:team) { create(:team, workspace: workspace, name: "Engineering", identifier: "ENG") }

    it "returns team detail with workflow_states by identifier" do
      get "/api/v1/#{workspace.slug}/teams/ENG", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["identifier"]).to eq("ENG")
      expect(json["name"]).to eq("Engineering")
      expect(json["workflow_states"]).to be_an(Array)
      expect(json["workflow_states"].length).to eq(6)
      state_types = json["workflow_states"].map { |s| s["state_type"] }
      expect(state_types).to include("backlog", "unstarted", "started", "in_review", "completed", "cancelled")
    end

  end

  describe "POST /api/v1/:workspace_slug/teams" do
    it "creates a team with default workflow states" do
      post "/api/v1/#{workspace.slug}/teams",
        params: { name: "Product", identifier: "PRD", color: "#10b981" }.to_json,
        headers: headers

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("Product")
      expect(json["identifier"]).to eq("PRD")
      expect(json["workflow_states"].length).to eq(6)
      expect(json["workflow_states"].map { |s| s["state_type"] }).to contain_exactly(
        "backlog", "unstarted", "started", "in_review", "completed", "cancelled"
      )
    end

    it "rejects invalid identifier" do
      post "/api/v1/#{workspace.slug}/teams",
        params: { name: "Bad Team", identifier: "bad!" }.to_json,
        headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "rejects duplicate identifier in same workspace" do
      create(:team, workspace: workspace, identifier: "ENG")

      post "/api/v1/#{workspace.slug}/teams",
        params: { name: "Engineering 2", identifier: "ENG" }.to_json,
        headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
