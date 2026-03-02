require "rails_helper"

RSpec.describe "Api::V1::Projects", type: :request do
  let(:user) { create(:user) }
  let(:workspace) { create(:workspace) }
  let!(:membership) { create(:workspace_membership, user: user, workspace: workspace, role: :owner) }
  let(:headers) { auth_headers_with_workspace(user, workspace) }

  describe "GET /api/v1/:workspace_slug/projects" do
    before do
      create(:project, workspace: workspace, name: "Alpha")
      create(:project, workspace: workspace, name: "Beta")
    end

    it "returns all projects" do
      get "/api/v1/#{workspace.slug}/projects", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
    end
  end

  describe "POST /api/v1/:workspace_slug/projects" do
    it "creates a project" do
      post "/api/v1/#{workspace.slug}/projects",
        params: { name: "New Project", color: "#ef4444", status: "planned" }.to_json,
        headers: headers

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("New Project")
      expect(json["status"]).to eq("planned")
      expect(json["progress"]).to eq(0)
    end
  end

  describe "GET /api/v1/:workspace_slug/projects/:id" do
    let!(:project) { create(:project, workspace: workspace, name: "Detail Test", lead: user) }

    it "returns project details" do
      get "/api/v1/#{workspace.slug}/projects/#{project.id}", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("Detail Test")
      expect(json["lead"]["id"]).to eq(user.id)
      expect(json).to have_key("teams")
    end
  end

  describe "PATCH /api/v1/:workspace_slug/projects/:id" do
    let!(:project) { create(:project, workspace: workspace) }

    it "updates project status" do
      patch "/api/v1/#{workspace.slug}/projects/#{project.id}",
        params: { status: "completed" }.to_json, headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["status"]).to eq("completed")
    end
  end

  describe "DELETE /api/v1/:workspace_slug/projects/:id" do
    let!(:project) { create(:project, workspace: workspace) }

    it "deletes the project" do
      delete "/api/v1/#{workspace.slug}/projects/#{project.id}", headers: headers
      expect(response).to have_http_status(:no_content)
    end
  end
end
