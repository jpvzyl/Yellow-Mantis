module Api
  module V1
    class WorkspacesController < BaseController
      def show
        render json: WorkspaceSerializer.render(current_workspace)
      end

      def update
        if current_workspace.update(workspace_params)
          render json: WorkspaceSerializer.render(current_workspace)
        else
          render json: { errors: current_workspace.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def members
        members = current_workspace.workspace_memberships.includes(:user)
        render json: members.map { |m|
          {
            id: m.id,
            user: UserSerializer.render(m.user),
            role: m.role,
            joined_at: m.joined_at
          }
        }
      end

      def join
        workspace = Workspace.find_by!(invite_code: params[:invite_code])

        membership = WorkspaceMembership.find_or_create_by!(workspace: workspace, user: current_user) do |m|
          m.role = :member
        end

        render json: {
          workspace: WorkspaceSerializer.render(workspace),
          membership: { id: membership.id, role: membership.role }
        }
      end

      private

      def workspace_params
        params.permit(:name, :logo)
      end
    end
  end
end
