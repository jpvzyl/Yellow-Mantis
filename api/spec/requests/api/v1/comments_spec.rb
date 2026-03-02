require "rails_helper"

RSpec.describe "Api::V1::Comments", type: :request do
  let(:user) { create(:user) }
  let(:workspace) { create(:workspace) }
  let!(:membership) { create(:workspace_membership, user: user, workspace: workspace, role: :owner) }
  let(:team) { create(:team, workspace: workspace) }
  let!(:issue) { create(:issue, team: team, creator: user) }
  let(:headers) { auth_headers_with_workspace(user, workspace) }

  describe "GET /api/v1/:workspace_slug/teams/:team_id/issues/:issue_id/comments" do
    before do
      create(:comment, issue: issue, user: user, body: "First comment")
      create(:comment, issue: issue, user: user, body: "Second comment")
    end

    it "returns comments for an issue" do
      get "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}/comments", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
      expect(json.first["body"]).to eq("First comment")
    end
  end

  describe "POST /api/v1/:workspace_slug/teams/:team_id/issues/:issue_id/comments" do
    it "creates a comment" do
      post "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}/comments",
        params: { body: "New comment on this issue" }.to_json, headers: headers

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["body"]).to eq("New comment on this issue")
      expect(json["user"]["id"]).to eq(user.id)
    end

    it "rejects empty body" do
      post "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}/comments",
        params: { body: "" }.to_json, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "PATCH /api/v1/:workspace_slug/teams/:team_id/issues/:issue_id/comments/:id" do
    let!(:comment) { create(:comment, issue: issue, user: user, body: "Original") }

    it "allows author to edit" do
      patch "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}/comments/#{comment.id}",
        params: { body: "Edited comment" }.to_json, headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["body"]).to eq("Edited comment")
      expect(json["edited_at"]).to be_present
    end

    it "forbids non-author from editing" do
      other_user = create(:user)
      other_headers = auth_headers_with_workspace(other_user, workspace)
      create(:workspace_membership, user: other_user, workspace: workspace)

      patch "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}/comments/#{comment.id}",
        params: { body: "Hacked" }.to_json, headers: other_headers

      expect(response).to have_http_status(:forbidden)
    end
  end

  describe "DELETE /api/v1/:workspace_slug/teams/:team_id/issues/:issue_id/comments/:id" do
    let!(:comment) { create(:comment, issue: issue, user: user) }

    it "allows author to delete" do
      delete "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}/comments/#{comment.id}",
        headers: headers

      expect(response).to have_http_status(:no_content)
    end
  end
end
