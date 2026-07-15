# frozen_string_literal: true

require "rails_helper"

# End-to-end request specs: full user journeys from auth through board operations.
RSpec.describe "Api::V1 E2E flows", type: :request do
  describe "full user journey: register → login → team → issues → board move → comment → search" do
    it "completes the full flow" do
      # 1. Register (creates user + workspace)
      post "/api/v1/auth/register",
        params: {
          email: "e2e@test.com",
          name: "E2E User",
          password: "password123",
          password_confirmation: "password123",
          workspace_name: "E2E Workspace"
        }.to_json,
        headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status(:created)
      register_json = JSON.parse(response.body)
      token = register_json["token"]
      workspace_slug = register_json["workspace"]["slug"]
      user_id = register_json["user"]["id"]
      headers = {
        "Authorization" => "Bearer #{token}",
        "Content-Type" => "application/json",
        "X-Workspace-Slug" => workspace_slug
      }

      # 2. Me (current user + workspaces)
      get "/api/v1/auth/me", headers: headers
      expect(response).to have_http_status(:ok)
      me_json = JSON.parse(response.body)
      expect(me_json["user"]["email"]).to eq("e2e@test.com")
      expect(me_json["workspaces"].length).to eq(1)

      # 3. Create team (with default workflow states)
      post "/api/v1/#{workspace_slug}/teams",
        params: { name: "Engineering", identifier: "ENG", color: "#6366f1" }.to_json,
        headers: headers

      expect(response).to have_http_status(:created)
      team_json = JSON.parse(response.body)
      team_id = team_json["id"]
      team_identifier = team_json["identifier"]
      expect(team_json["workflow_states"].length).to eq(6)

      # 4. Get team show (by identifier) for board workflow_states
      get "/api/v1/#{workspace_slug}/teams/#{team_identifier}", headers: headers
      expect(response).to have_http_status(:ok)
      show_team = JSON.parse(response.body)
      expect(show_team["workflow_states"].length).to eq(6)
      backlog_state = show_team["workflow_states"].find { |s| s["state_type"] == "backlog" }
      started_state = show_team["workflow_states"].find { |s| s["state_type"] == "started" }
      expect(backlog_state).to be_present
      expect(started_state).to be_present

      # 5. Create two issues
      post "/api/v1/#{workspace_slug}/teams/#{team_id}/issues",
        params: { title: "First issue", priority: 2 }.to_json,
        headers: headers
      expect(response).to have_http_status(:created)
      issue1 = JSON.parse(response.body)
      expect(issue1["state"]["state_type"]).to eq("backlog")

      post "/api/v1/#{workspace_slug}/teams/#{team_id}/issues",
        params: { title: "Second issue for search", priority: 1 }.to_json,
        headers: headers
      expect(response).to have_http_status(:created)
      issue2 = JSON.parse(response.body)

      # 6. List issues
      get "/api/v1/#{workspace_slug}/teams/#{team_identifier}/issues", headers: headers
      expect(response).to have_http_status(:ok)
      issues_list = JSON.parse(response.body)
      expect(issues_list.length).to eq(2)

      # 7. Update issue state (board drag: move to "started")
      patch "/api/v1/#{workspace_slug}/teams/#{team_identifier}/issues/#{issue1["id"]}",
        params: { state_id: started_state["id"] }.to_json,
        headers: headers
      expect(response).to have_http_status(:ok)
      updated = JSON.parse(response.body)
      expect(updated["state"]["state_type"]).to eq("started")

      # 8. Bulk update (move second issue to started, optional assignee)
      post "/api/v1/#{workspace_slug}/teams/#{team_identifier}/issues/bulk_update",
        params: {
          issue_ids: [issue2["id"]],
          updates: { state_id: started_state["id"], assignee_id: user_id }
        }.to_json,
        headers: headers
      expect(response).to have_http_status(:ok)
      bulk_result = JSON.parse(response.body)
      expect(bulk_result.length).to eq(1)
      expect(bulk_result.first["state"]["state_type"]).to eq("started")
      expect(bulk_result.first["assignee"]["id"]).to eq(user_id)

      # 9. Add comment on first issue
      post "/api/v1/#{workspace_slug}/teams/#{team_identifier}/issues/#{issue1["id"]}/comments",
        params: { body: "Comment from E2E" }.to_json,
        headers: headers
      expect(response).to have_http_status(:created)
      comment_json = JSON.parse(response.body)
      expect(comment_json["body"]).to eq("Comment from E2E")

      # 10. Search
      get "/api/v1/#{workspace_slug}/search", params: { q: "search" }, headers: headers
      expect(response).to have_http_status(:ok)
      search_json = JSON.parse(response.body)
      expect(search_json["issues"].length).to eq(1)
      expect(search_json["issues"].first["title"]).to include("search")

      # 11. Get issue detail (with sub_issues and description)
      get "/api/v1/#{workspace_slug}/teams/#{team_identifier}/issues/#{issue1["id"]}", headers: headers
      expect(response).to have_http_status(:ok)
      detail = JSON.parse(response.body)
      expect(detail["title"]).to eq("First issue")
      expect(detail).to have_key("sub_issues")
      expect(detail).to have_key("description")

      # 12. List comments
      get "/api/v1/#{workspace_slug}/teams/#{team_identifier}/issues/#{issue1["id"]}/comments", headers: headers
      expect(response).to have_http_status(:ok)
      comments = JSON.parse(response.body)
      expect(comments.length).to eq(1)
      expect(comments.first["body"]).to eq("Comment from E2E")
    end
  end

  describe "login and list teams + projects" do
    let!(:user) { create(:user, email: "flow2@test.com", password: "password123") }
    let!(:workspace) { create(:workspace, name: "Flow Workspace") }
    let!(:membership) { create(:workspace_membership, user: user, workspace: workspace, role: :owner) }

    it "login → teams → projects" do
      post "/api/v1/auth/login",
        params: { email: "flow2@test.com", password: "password123" }.to_json,
        headers: { "Content-Type" => "application/json" }
      expect(response).to have_http_status(:ok)
      token = JSON.parse(response.body)["token"]
      headers = {
        "Authorization" => "Bearer #{token}",
        "Content-Type" => "application/json",
        "X-Workspace-Slug" => workspace.slug
      }

      get "/api/v1/#{workspace.slug}/teams", headers: headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an(Array)

      create(:project, workspace: workspace, name: "Alpha")
      get "/api/v1/#{workspace.slug}/projects", headers: headers
      expect(response).to have_http_status(:ok)
      projects = JSON.parse(response.body)
      expect(projects.length).to eq(1)
      expect(projects.first["name"]).to eq("Alpha")
    end
  end
end
