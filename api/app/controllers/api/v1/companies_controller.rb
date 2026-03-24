module Api
  module V1
    class CompaniesController < BaseController
      def index
        companies = current_user.companies.order(:name)
        render json: companies.map { |c|
          CompanySerializer.render(c, membership: current_user.company_memberships.find_by(company: c))
        }
      end

      def show
        company = current_user.companies.find(params[:id])
        render json: CompanySerializer.render(company,
          membership: current_user.company_memberships.find_by(company: company))
      end

      def create
        company = ::Company.new(company_params)

        ActiveRecord::Base.transaction do
          company.save!
          ::CompanyMembership.create!(company: company, user: current_user, role: :admin)
        end

        render json: CompanySerializer.render(company,
          membership: current_user.company_memberships.find_by(company: company)),
          status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
      end

      def update
        company = current_user.companies.find(params[:id])
        authorize_admin!(company)

        if company.update(company_params)
          render json: CompanySerializer.render(company,
            membership: current_user.company_memberships.find_by(company: company))
        else
          render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def company_params
        params.permit(:name, :description, :logo, :color)
      end

      def authorize_admin!(company)
        unless current_user.admin_of?(company)
          render json: { error: "Forbidden" }, status: :forbidden
          return
        end
      end
    end
  end
end
