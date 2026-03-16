module Api
  module V1
    module Vault
      class DocumentsController < BaseController
        before_action :set_document, only: [:show, :destroy, :download]

        def index
          docs = current_business.documents.ordered
          docs = docs.by_category(params[:category]) if params[:category].present?
          docs = paginate_collection(docs)

          render json: docs.map { |d| serialize(d) }
        end

        def create
          doc = current_business.documents.build(document_params)
          doc.uploaded_by = current_user

          if params[:file].present?
            doc.file.attach(params[:file])
            doc.file_size = params[:file].size
            doc.content_type = params[:file].content_type
            doc.file_fingerprint = Digest::SHA256.hexdigest(params[:file].read)
            params[:file].rewind
          end

          if doc.save
            audit!("document.upload", resource: doc, details: { name: doc.name, category: doc.category })
            render json: serialize(doc), status: :created
          else
            render json: { errors: doc.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def show
          render json: serialize(@document, detailed: true)
        end

        def destroy
          audit!("document.delete", resource: @document, details: { name: @document.name })
          @document.destroy!
          head :no_content
        end

        def download
          if @document.file.attached?
            audit!("document.download", resource: @document)
            redirect_to rails_blob_url(@document.file, disposition: "attachment"), allow_other_host: true
          else
            render json: { error: "No file attached" }, status: :not_found
          end
        end

        private

        def set_document
          @document = current_business.documents.find(params[:id])
        end

        def document_params
          params.permit(:name, :description, :category, :sensitive)
        end

        def serialize(doc, detailed: false)
          data = {
            id: doc.id,
            name: doc.name,
            description: doc.description,
            category: doc.category,
            file_size: doc.file_size,
            content_type: doc.content_type,
            sensitive: doc.sensitive,
            uploaded_by: { id: doc.uploaded_by.id, name: doc.uploaded_by.name },
            has_file: doc.file.attached?,
            created_at: doc.created_at,
            updated_at: doc.updated_at
          }

          if detailed
            data[:file_fingerprint] = doc.file_fingerprint
            data[:metadata] = doc.metadata
          end

          data
        end
      end
    end
  end
end
