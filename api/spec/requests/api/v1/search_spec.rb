require "rails_helper"

RSpec.describe "Api::V1::Search", type: :request do
  let(:user) { create(:user) }
  let(:workspace) { create(:workspace) }
  let!(:membership) { create(:workspace_membership, user: user, workspace: workspace, role: :owner) }
  let(:team) { create(:team, workspace: workspace) }
  let(:headers) { auth_headers_with_workspace(user, workspace) }

  before do
    create(:issue, team: team, creator: user, title: "Fix login bug")
    create(:issue, team: team, creator: user, title: "Add dark mode")
    create(:issue, team: team, creator: user, title: "Refactor auth service")
    Project.create!(workspace: workspace, name: "Authentication Overhaul")
  end

  describe "GET /api/v1/:workspace_slug/search" do
    it "searches issues by title" do
      get "/api/v1/#{workspace.slug}/search", params: { q: "login" }, headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["issues"].length).to eq(1)
      expect(json["issues"].first["title"]).to include("login")
    end

    it "searches projects by name" do
      get "/api/v1/#{workspace.slug}/search", params: { q: "Auth" }, headers: headers

      json = JSON.parse(response.body)
      expect(json["projects"].length).to eq(1)
      expect(json["projects"].first["name"]).to include("Authentication")
    end

    it "returns empty results for no match" do
      get "/api/v1/#{workspace.slug}/search", params: { q: "zzzznotfound" }, headers: headers

      json = JSON.parse(response.body)
      expect(json["issues"]).to be_empty
      expect(json["projects"]).to be_empty
    end

    it "returns empty for blank query" do
      get "/api/v1/#{workspace.slug}/search", params: { q: "" }, headers: headers

      json = JSON.parse(response.body)
      expect(json["issues"]).to be_empty
    end
  end
end
