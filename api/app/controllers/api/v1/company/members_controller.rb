module Api
  module V1
    module Company
      class MembersController < BaseController
        before_action :set_company
        before_action :authorize_admin!, except: [:index]

        def index
          memberships = @company.company_memberships.includes(:user).order("users.name")
          render json: memberships.map { |m|
            {
              id: m.id,
              user: UserSerializer.render(m.user),
              role: m.role,
              joined_at: m.joined_at
            }
          }
        end

        def create
          user = find_or_create_user
          membership = ::CompanyMembership.find_or_initialize_by(company: @company, user: user)
          membership.role = params[:role] || :member

          if membership.save
            render json: {
              id: membership.id,
              user: UserSerializer.render(user),
              role: membership.role,
              joined_at: membership.joined_at
            }, status: :created
          else
            render json: { errors: membership.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          membership = @company.company_memberships.find(params[:id])
          if membership.update(role: params[:role])
            render json: {
              id: membership.id,
              user: UserSerializer.render(membership.user),
              role: membership.role,
              joined_at: membership.joined_at
            }
          else
            render json: { errors: membership.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          membership = @company.company_memberships.find(params[:id])
          if membership.user == current_user
            render json: { error: "Cannot remove yourself" }, status: :unprocessable_entity
            return
          end

          membership.user.workspace_memberships
            .joins(:workspace).where(workspaces: { company_id: @company.id })
            .destroy_all

          membership.destroy!
          head :no_content
        end

        private

        def set_company
          @company = current_user.companies.find(params[:company_id])
        end

        def authorize_admin!
          unless current_user.admin_of?(@company)
            render json: { error: "Forbidden" }, status: :forbidden
          end
        end

        def find_or_create_user
          user = User.find_by(email: params[:email]&.downcase)
          return user if user

          generated_password = params[:password] || SecureRandom.hex(12)
          User.create!(
            email: params[:email]&.downcase,
            name: params[:name] || params[:email]&.split("@")&.first&.titleize,
            password: generated_password,
            password_confirmation: generated_password
          )
        end
      end
    end
  end
end
