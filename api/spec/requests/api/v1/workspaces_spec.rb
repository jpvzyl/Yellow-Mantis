require "rails_helper"

RSpec.describe "Api::V1::Workspaces", type: :request do
  let(:user) { create(:user) }
  let(:workspace) { create(:workspace, name: "Test Workspace") }
  let!(:membership) { create(:workspace_membership, user: user, workspace: workspace, role: :owner) }
  let(:headers) { auth_headers_with_workspace(user, workspace) }

  describe "GET /api/v1/:workspace_slug/workspace" do
    it "returns workspace details" do
      get "/api/v1/#{workspace.slug}/workspace", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("Test Workspace")
      expect(json["slug"]).to eq(workspace.slug)
    end
  end

  describe "PATCH /api/v1/:workspace_slug/workspace" do
    it "updates workspace name" do
      patch "/api/v1/#{workspace.slug}/workspace",
        params: { name: "Renamed" }.to_json, headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("Renamed")
    end
  end

  describe "GET /api/v1/:workspace_slug/workspace/members" do
    it "returns members list" do
      get "/api/v1/#{workspace.slug}/workspace/members", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json.first["role"]).to eq("owner")
    end
  end

  describe "POST /api/v1/workspaces/join" do
    it "joins workspace via invite code" do
      other_user = create(:user)

      post "/api/v1/workspaces/join",
        params: { invite_code: workspace.invite_code }.to_json,
        headers: auth_headers(other_user)

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["workspace"]["slug"]).to eq(workspace.slug)
      expect(json["membership"]["role"]).to eq("member")
    end

    it "rejects invalid invite code" do
      post "/api/v1/workspaces/join",
        params: { invite_code: "bad-code" }.to_json,
        headers: auth_headers(user)

      expect(response).to have_http_status(:not_found)
    end
  end
end
