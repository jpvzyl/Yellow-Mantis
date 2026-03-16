module Api
  module V1
    module Vault
      class BusinessesController < BaseController
        before_action :set_business, only: [:show, :update, :destroy, :archive, :unarchive]

        def index
          businesses = current_user.vault_businesses
          businesses = params[:include_archived] == "true" ? businesses : businesses.active
          businesses = businesses.ordered.includes(:accounts, :pages)

          render json: businesses.map { |b| serialize_business(b) }
        end

        def show
          render json: serialize_business(@business, detailed: true)
        end

        def create
          business = current_user.vault_businesses.build(business_params)

          if business.save
            audit!("business.create", resource: business)
            render json: serialize_business(business), status: :created
          else
            render json: { errors: business.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          if @business.update(business_params)
            audit!("business.update", resource: @business)
            render json: serialize_business(@business)
          else
            render json: { errors: @business.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          audit!("business.delete", resource: @business, details: { name: @business.name })
          @business.destroy!
          head :no_content
        end

        def archive
          @business.update!(archived: true)
          audit!("business.archive", resource: @business)
          render json: serialize_business(@business)
        end

        def unarchive
          @business.update!(archived: false)
          audit!("business.archive", resource: @business, details: { archived: false })
          render json: serialize_business(@business)
        end

        def reorder
          positions = params.require(:positions)
          positions.each do |item|
            current_user.vault_businesses.find(item[:id]).update!(position: item[:position])
          end
          head :no_content
        end

        private

        def set_business
          @current_business = @business = current_user.vault_businesses.find(params[:id])
        end

        def business_params
          params.require(:business).permit(:name, :description, :color, :icon, :website_url)
        end

        def serialize_business(business, detailed: false)
          data = {
            id: business.id,
            name: business.name,
            slug: business.slug,
            description: business.description,
            color: business.color,
            icon: business.icon,
            website_url: business.website_url,
            position: business.position,
            archived: business.archived,
            accounts_count: business.accounts.size,
            pages_count: business.pages.size,
            documents_count: business.documents.size,
            created_at: business.created_at,
            updated_at: business.updated_at
          }

          if detailed
            data[:accounts] = business.accounts.map { |a| serialize_account(a) }
            data[:pages] = business.pages.ordered.map { |p| serialize_page(p) }
          end

          data
        end

        def serialize_account(account)
          {
            id: account.id,
            provider: account.provider,
            email: account.email,
            display_name: account.display_name,
            avatar_url: account.avatar_url,
            status: account.status,
            last_synced_at: account.last_synced_at,
            token_expires_at: account.token_expires_at
          }
        end

        def serialize_page(page)
          {
            id: page.id,
            name: page.name,
            url: page.url,
            icon: page.icon,
            category: page.category,
            position: page.position,
            pinned: page.pinned
          }
        end
      end
    end
  end
end
