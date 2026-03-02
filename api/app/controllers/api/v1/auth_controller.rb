module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_user!, only: [:register, :login, :refresh]

      def register
        user = User.new(register_params)

        if user.save
          workspace = nil
          if params[:workspace_name].present?
            workspace = Workspace.create!(name: params[:workspace_name])
            WorkspaceMembership.create!(workspace: workspace, user: user, role: :owner)
          end

          render json: {
            user: UserSerializer.render(user),
            token: user.generate_token,
            refresh_token: user.generate_refresh_token,
            workspace: workspace ? WorkspaceSerializer.render(workspace) : nil
          }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def login
        user = User.find_by(email: params[:email]&.downcase)

        if user&.authenticate(params[:password])
          render json: {
            user: UserSerializer.render(user),
            token: user.generate_token,
            refresh_token: user.generate_refresh_token
          }
        else
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end

      def refresh
        decoded = JsonWebToken.decode(params[:refresh_token])

        if decoded && decoded[:type] == "refresh"
          user = User.find_by(id: decoded[:user_id])
          if user
            render json: {
              token: user.generate_token,
              refresh_token: user.generate_refresh_token
            }
          else
            render json: { error: "Invalid token" }, status: :unauthorized
          end
        else
          render json: { error: "Invalid refresh token" }, status: :unauthorized
        end
      end

      def me
        render json: {
          user: UserSerializer.render(current_user),
          workspaces: current_user.workspaces.map { |w| WorkspaceSerializer.render(w) }
        }
      end

      private

      def register_params
        params.permit(:email, :name, :password, :password_confirmation).tap do |p|
          p[:email] = p[:email]&.downcase
        end
      end
    end
  end
end
