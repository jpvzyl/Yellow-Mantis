module Api
  module V1
    class BaseController < ApplicationController
      before_action :set_current_user

      private

      def set_current_user
        Current.user = current_user
      end

      def paginate(scope)
        page = (params[:page] || 1).to_i
        per = (params[:per_page] || 50).to_i.clamp(1, 100)
        paginated = scope.page(page).per(per)

        response.set_header("X-Total-Count", paginated.total_count.to_s)
        response.set_header("X-Page", page.to_s)
        response.set_header("X-Per-Page", per.to_s)

        paginated
      end
    end
  end
end
