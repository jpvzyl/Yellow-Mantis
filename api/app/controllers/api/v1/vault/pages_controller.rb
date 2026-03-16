module Api
  module V1
    module Vault
      class PagesController < BaseController
        before_action :set_page, only: [:show, :update, :destroy, :toggle_pin]

        def index
          pages = current_business.pages.ordered
          pages = pages.where(category: params[:category]) if params[:category].present?

          render json: pages.map { |p| serialize(p) }
        end

        def create
          page = current_business.pages.build(page_params)

          if page.save
            audit!("page.create", resource: page, details: { url: page.url })
            render json: serialize(page), status: :created
          else
            render json: { errors: page.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @page.update(page_params)
            audit!("page.update", resource: @page)
            render json: serialize(@page)
          else
            render json: { errors: @page.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          audit!("page.delete", resource: @page, details: { name: @page.name })
          @page.destroy!
          head :no_content
        end

        def toggle_pin
          @page.update!(pinned: !@page.pinned)
          render json: serialize(@page)
        end

        def reorder
          positions = params.require(:positions)
          positions.each do |item|
            current_business.pages.find(item[:id]).update!(position: item[:position])
          end
          head :no_content
        end

        private

        def set_page
          @page = current_business.pages.find(params[:id])
        end

        def page_params
          params.require(:page).permit(:name, :url, :icon, :category, :pinned)
        end

        def serialize(page)
          {
            id: page.id,
            name: page.name,
            url: page.url,
            icon: page.icon,
            category: page.category,
            position: page.position,
            pinned: page.pinned,
            created_at: page.created_at
          }
        end
      end
    end
  end
end
