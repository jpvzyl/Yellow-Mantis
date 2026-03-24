module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_user!, only: [:register, :login, :refresh]

      def register
        user = User.new(register_params)

        if user.save
          company = nil
          workspace = nil

          if params[:company_name].present?
            company = Company.create!(name: params[:company_name])
            CompanyMembership.create!(company: company, user: user, role: :admin)
            workspace = company.workspaces.first
          elsif params[:workspace_name].present?
            workspace = Workspace.create!(name: params[:workspace_name])
            WorkspaceMembership.create!(workspace: workspace, user: user, role: :owner)
          end

          render json: {
            user: UserSerializer.render(user),
            token: user.generate_token,
            refresh_token: user.generate_refresh_token,
            workspace: workspace ? WorkspaceSerializer.render(workspace) : nil,
            company: company ? CompanySerializer.render(company, membership: user.company_memberships.find_by(company: company)) : nil
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
        companies = current_user.companies.includes(:workspaces)
        render json: {
          user: UserSerializer.render(current_user),
          workspaces: current_user.workspaces.map { |w| WorkspaceSerializer.render(w) },
          companies: companies.map { |c|
            CompanySerializer.render(c, membership: current_user.company_memberships.find_by(company: c))
          }
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
