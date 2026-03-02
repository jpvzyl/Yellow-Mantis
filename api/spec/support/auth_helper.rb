module AuthHelper
  def auth_headers(user)
    token = user.generate_token
    { "Authorization" => "Bearer #{token}", "Content-Type" => "application/json" }
  end

  def auth_headers_with_workspace(user, workspace)
    auth_headers(user).merge("X-Workspace-Slug" => workspace.slug)
  end
end

RSpec.configure do |config|
  config.include AuthHelper, type: :request
end
