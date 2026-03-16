module Api
  module V1
    module Vault
      class BaseController < ::Api::V1::BaseController
        before_action :set_current_user

        private

        def current_business
          @current_business ||= current_user.vault_businesses.find(params[:business_id])
        end

        def audit!(action, resource: nil, details: {})
          ::Vault::AuditLog.record!(
            user: current_user,
            action: action,
            business: @current_business,
            resource: resource,
            request: request,
            details: details
          )
        end

        def paginate_collection(scope, per: 20)
          page = (params[:page] || 1).to_i
          per = (params[:per_page] || per).to_i.clamp(1, 100)
          total = scope.count
          items = scope.offset((page - 1) * per).limit(per)

          response.set_header("X-Total-Count", total.to_s)
          response.set_header("X-Page", page.to_s)
          response.set_header("X-Per-Page", per.to_s)

          items
        end
      end
    end
  end
end
