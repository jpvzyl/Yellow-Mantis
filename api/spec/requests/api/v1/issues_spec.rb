require "rails_helper"

RSpec.describe "Api::V1::Issues", type: :request do
  let(:user) { create(:user) }
  let(:workspace) { create(:workspace) }
  let!(:membership) { create(:workspace_membership, user: user, workspace: workspace, role: :owner) }
  let(:team) { create(:team, workspace: workspace) }
  let(:headers) { auth_headers_with_workspace(user, workspace) }

  describe "GET /api/v1/:workspace_slug/teams/:team_id/issues" do
    before do
      5.times do |i|
        create(:issue, team: team, creator: user, title: "Issue #{i}", priority: i % 5)
      end
    end

    it "returns all issues for the team" do
      get "/api/v1/#{workspace.slug}/teams/#{team.id}/issues", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end

    it "filters by priority" do
      get "/api/v1/#{workspace.slug}/teams/#{team.id}/issues",
        params: { priority: 1 }, headers: headers

      json = JSON.parse(response.body)
      json.each { |issue| expect(issue["priority"]).to eq(1) }
    end

    it "filters by state" do
      state = team.workflow_states.find_by(state_type: :backlog)
      issue = create(:issue, team: team, creator: user, state: state)

      get "/api/v1/#{workspace.slug}/teams/#{team.id}/issues",
        params: { state_id: state.id }, headers: headers

      json = JSON.parse(response.body)
      expect(json.map { |i| i["id"] }).to include(issue.id)
    end

    it "sorts by priority" do
      get "/api/v1/#{workspace.slug}/teams/#{team.id}/issues",
        params: { sort_by: "priority" }, headers: headers

      json = JSON.parse(response.body)
      priorities = json.map { |i| i["priority"] }
      expect(priorities).to eq(priorities.sort)
    end
  end

  describe "POST /api/v1/:workspace_slug/teams/:team_id/issues" do
    it "creates an issue" do
      post "/api/v1/#{workspace.slug}/teams/#{team.id}/issues",
        params: { title: "New bug report", priority: 2 }.to_json, headers: headers

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["title"]).to eq("New bug report")
      expect(json["priority"]).to eq(2)
      expect(json["identifier"]).to match(/\A[A-Z]+-\d+\z/)
      expect(json["creator"]["id"]).to eq(user.id)
      expect(json["state"]).to be_present
    end

    it "auto-assigns the backlog state" do
      post "/api/v1/#{workspace.slug}/teams/#{team.id}/issues",
        params: { title: "Auto state test" }.to_json, headers: headers

      json = JSON.parse(response.body)
      expect(json["state"]["state_type"]).to eq("backlog")
    end

    it "rejects missing title" do
      post "/api/v1/#{workspace.slug}/teams/#{team.id}/issues",
        params: { priority: 2 }.to_json, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "PATCH /api/v1/:workspace_slug/teams/:team_id/issues/:id" do
    let!(:issue) { create(:issue, team: team, creator: user, title: "Original title") }

    it "updates the issue" do
      patch "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}",
        params: { title: "Updated title", priority: 1 }.to_json, headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["title"]).to eq("Updated title")
      expect(json["priority"]).to eq(1)
    end

    it "changes issue status" do
      done_state = team.workflow_states.find_by(state_type: :completed)
      patch "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}",
        params: { state_id: done_state.id }.to_json, headers: headers

      json = JSON.parse(response.body)
      expect(json["state"]["state_type"]).to eq("completed")
    end

    it "assigns a user" do
      patch "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}",
        params: { assignee_id: user.id }.to_json, headers: headers

      json = JSON.parse(response.body)
      expect(json["assignee"]["id"]).to eq(user.id)
    end
  end

  describe "DELETE /api/v1/:workspace_slug/teams/:team_id/issues/:id" do
    let!(:issue) { create(:issue, team: team, creator: user) }

    it "deletes the issue" do
      delete "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}", headers: headers

      expect(response).to have_http_status(:no_content)
      expect(Issue.find_by(id: issue.id)).to be_nil
    end
  end

  describe "GET /api/v1/:workspace_slug/teams/:team_id/issues/:id" do
    let!(:issue) { create(:issue, team: team, creator: user, title: "Detail test") }

    it "returns issue detail with description and sub-issues" do
      get "/api/v1/#{workspace.slug}/teams/#{team.id}/issues/#{issue.id}", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["title"]).to eq("Detail test")
      expect(json).to have_key("description")
      expect(json).to have_key("sub_issues")
    end
  end
end
