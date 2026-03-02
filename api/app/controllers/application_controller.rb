class ApplicationController < ActionController::API
  include Pundit::Authorization

  before_action :authenticate_user!

  rescue_from Pundit::NotAuthorizedError, with: :forbidden
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable

  private

  def authenticate_user!
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last

    if token
      decoded = JsonWebToken.decode(token)
      @current_user = User.find_by(id: decoded&.dig(:user_id)) if decoded
    end

    render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
  end

  def current_user
    @current_user
  end

  def current_workspace
    @current_workspace ||= current_user.workspaces.find_by!(slug: params[:workspace_slug] || request.headers["X-Workspace-Slug"])
  end

  def current_membership
    @current_membership ||= WorkspaceMembership.find_by!(workspace: current_workspace, user: current_user)
  end

  def forbidden
    render json: { error: "Forbidden" }, status: :forbidden
  end

  def not_found
    render json: { error: "Not found" }, status: :not_found
  end

  def unprocessable(exception)
    render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
