module Api
  module V1
    class LabelsController < BaseController
      before_action :set_label, only: [:update, :destroy]

      def index
        labels = current_workspace.labels.includes(:parent_label, :child_labels).order(:name)
        render json: labels.map { |l| LabelSerializer.render(l) }
      end

      def create
        label = current_workspace.labels.build(label_params)
        if label.save
          render json: LabelSerializer.render(label), status: :created
        else
          render json: { errors: label.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @label.update(label_params)
          render json: LabelSerializer.render(@label)
        else
          render json: { errors: @label.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @label.destroy!
        head :no_content
      end

      private

      def set_label
        @label = current_workspace.labels.find(params[:id])
      end

      def label_params
        params.permit(:name, :color, :parent_label_id)
      end
    end
  end
end
