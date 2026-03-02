module Api
  module V1
    class ProjectsController < BaseController
      before_action :set_project, only: [:show, :update, :destroy]

      def index
        projects = current_workspace.projects.includes(:lead, :teams).order(:sort_order, :name)
        render json: projects.map { |p| ProjectSerializer.render(p) }
      end

      def show
        render json: ProjectSerializer.render(@project, view: :detail)
      end

      def create
        project = current_workspace.projects.build(project_params)
        if project.save
          render json: ProjectSerializer.render(project), status: :created
        else
          render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @project.update(project_params)
          render json: ProjectSerializer.render(@project)
        else
          render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @project.destroy!
        head :no_content
      end

      private

      def set_project
        @project = current_workspace.projects.find(params[:id])
      end

      def project_params
        params.permit(:name, :description, :icon, :color, :status, :lead_id,
                      :start_date, :target_date, :sort_order, team_ids: [])
      end
    end
  end
end
