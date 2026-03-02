require "rails_helper"

RSpec.describe "Api::V1::Labels", type: :request do
  let(:user) { create(:user) }
  let(:workspace) { create(:workspace) }
  let!(:membership) { create(:workspace_membership, user: user, workspace: workspace, role: :owner) }
  let(:headers) { auth_headers_with_workspace(user, workspace) }

  describe "GET /api/v1/:workspace_slug/labels" do
    before do
      create(:label, workspace: workspace, name: "Bug", color: "#ef4444")
      create(:label, workspace: workspace, name: "Feature", color: "#3b82f6")
    end

    it "returns all labels" do
      get "/api/v1/#{workspace.slug}/labels", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
      expect(json.map { |l| l["name"] }).to contain_exactly("Bug", "Feature")
    end
  end

  describe "POST /api/v1/:workspace_slug/labels" do
    it "creates a label" do
      post "/api/v1/#{workspace.slug}/labels",
        params: { name: "Enhancement", color: "#10b981" }.to_json, headers: headers

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("Enhancement")
      expect(json["color"]).to eq("#10b981")
    end

    it "rejects missing name" do
      post "/api/v1/#{workspace.slug}/labels",
        params: { color: "#10b981" }.to_json, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "PATCH /api/v1/:workspace_slug/labels/:id" do
    let!(:label) { create(:label, workspace: workspace, name: "Old Name") }

    it "updates a label" do
      patch "/api/v1/#{workspace.slug}/labels/#{label.id}",
        params: { name: "New Name" }.to_json, headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("New Name")
    end
  end

  describe "DELETE /api/v1/:workspace_slug/labels/:id" do
    let!(:label) { create(:label, workspace: workspace) }

    it "deletes a label" do
      delete "/api/v1/#{workspace.slug}/labels/#{label.id}", headers: headers
      expect(response).to have_http_status(:no_content)
      expect(Label.find_by(id: label.id)).to be_nil
    end
  end
end
