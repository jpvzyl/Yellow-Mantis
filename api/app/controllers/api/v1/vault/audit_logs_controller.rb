module Api
  module V1
    module Vault
      class AuditLogsController < BaseController
        def index
          logs = current_user.vault_audit_logs.recent
          logs = logs.for_business(params[:business_id]) if params[:business_id].present?
          logs = paginate_collection(logs, per: 50)

          render json: logs.map { |l| serialize(l) }
        end

        private

        def serialize(log)
          {
            id: log.id,
            action: log.action,
            resource_type: log.resource_type,
            resource_id: log.resource_id,
            ip_address: log.ip_address,
            details: log.details,
            business_id: log.vault_business_id,
            created_at: log.created_at
          }
        end
      end
    end
  end
end
