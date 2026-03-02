require "rails_helper"

RSpec.describe "Api::V1::Auth", type: :request do
  describe "POST /api/v1/auth/register" do
    let(:valid_params) do
      { email: "test@example.com", name: "Test User", password: "password123",
        password_confirmation: "password123", workspace_name: "My Workspace" }
    end

    it "creates a user and workspace" do
      post "/api/v1/auth/register", params: valid_params.to_json,
        headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status(:created)

      json = JSON.parse(response.body)
      expect(json["user"]["email"]).to eq("test@example.com")
      expect(json["user"]["name"]).to eq("Test User")
      expect(json["token"]).to be_present
      expect(json["refresh_token"]).to be_present
      expect(json["workspace"]["name"]).to eq("My Workspace")
    end

    it "creates user without workspace" do
      post "/api/v1/auth/register",
        params: valid_params.except(:workspace_name).to_json,
        headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["workspace"]).to be_nil
    end

    it "rejects duplicate email" do
      create(:user, email: "test@example.com")

      post "/api/v1/auth/register", params: valid_params.to_json,
        headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "rejects missing name" do
      post "/api/v1/auth/register",
        params: valid_params.except(:name).to_json,
        headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "POST /api/v1/auth/login" do
    let!(:user) { create(:user, email: "login@test.com", password: "password123") }

    it "returns token for valid credentials" do
      post "/api/v1/auth/login",
        params: { email: "login@test.com", password: "password123" }.to_json,
        headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["token"]).to be_present
      expect(json["user"]["email"]).to eq("login@test.com")
    end

    it "rejects invalid password" do
      post "/api/v1/auth/login",
        params: { email: "login@test.com", password: "wrong" }.to_json,
        headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status(:unauthorized)
    end

    it "rejects non-existent email" do
      post "/api/v1/auth/login",
        params: { email: "nobody@test.com", password: "password123" }.to_json,
        headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "GET /api/v1/auth/me" do
    let(:user) { create(:user) }
    let!(:workspace) { create(:workspace) }
    let!(:membership) { create(:workspace_membership, user: user, workspace: workspace) }

    it "returns current user and workspaces" do
      get "/api/v1/auth/me", headers: auth_headers(user)

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["user"]["id"]).to eq(user.id)
      expect(json["workspaces"].length).to eq(1)
    end

    it "rejects unauthenticated request" do
      get "/api/v1/auth/me"
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
