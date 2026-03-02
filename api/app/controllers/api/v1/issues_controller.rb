module Api
  module V1
    class IssuesController < BaseController
      before_action :set_team
      before_action :set_issue, only: [:show, :update, :destroy]

      def index
        issues = @team.issues.includes(:state, :assignee, :creator, :labels, :project)

        issues = apply_filters(issues)
        issues = apply_sorting(issues)

        paginated = paginate(issues)
        render json: paginated.map { |i| IssueSerializer.render(i) }
      end

      def show
        render json: IssueSerializer.render(@issue, view: :detail)
      end

      def create
        issue = @team.issues.build(issue_params)
        issue.creator = current_user
        issue.state ||= @team.workflow_states.find_by(state_type: :backlog) || @team.workflow_states.first

        if issue.save
          render json: IssueSerializer.render(issue), status: :created
        else
          render json: { errors: issue.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @issue.update(issue_params)
          render json: IssueSerializer.render(@issue)
        else
          render json: { errors: @issue.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @issue.destroy!
        head :no_content
      end

      def bulk_update
        issue_ids = params[:issue_ids]
        updates = params[:updates]&.permit(:state_id, :priority, :assignee_id, :project_id, :cycle_id)

        return render json: { error: "No issues specified" }, status: :bad_request if issue_ids.blank?

        issues = @team.issues.where(id: issue_ids)
        issues.each { |issue| issue.update!(updates.to_h) }

        render json: issues.map { |i| IssueSerializer.render(i.reload) }
      end

      private

      def set_team
        @team = current_workspace.teams.find_by!(identifier: params[:team_id]) rescue
                current_workspace.teams.find(params[:team_id])
      end

      def set_issue
        @issue = @team.issues.find(params[:id])
      end

      def issue_params
        params.permit(:title, :description, :state_id, :priority, :assignee_id,
                      :project_id, :cycle_id, :parent_id, :estimate, :due_date,
                      :sort_order, label_ids: [])
      end

      def apply_filters(scope)
        scope = scope.where(state_id: params[:state_id]) if params[:state_id].present?
        scope = scope.where(priority: params[:priority]) if params[:priority].present?
        scope = scope.where(assignee_id: params[:assignee_id]) if params[:assignee_id].present?
        scope = scope.where(project_id: params[:project_id]) if params[:project_id].present?
        scope = scope.where(cycle_id: params[:cycle_id]) if params[:cycle_id].present?
        scope = scope.where(creator_id: params[:creator_id]) if params[:creator_id].present?
        scope = scope.where(parent_id: params[:parent_id]) if params.key?(:parent_id)
        scope = scope.search(params[:q]) if params[:q].present?

        if params[:state_type].present?
          scope = scope.joins(:state).where(workflow_states: { state_type: params[:state_type] })
        end

        if params[:label_ids].present?
          scope = scope.joins(:issue_labels).where(issue_labels: { label_id: params[:label_ids] }).distinct
        end

        scope
      end

      def apply_sorting(scope)
        case params[:sort_by]
        when "priority" then scope.order(priority: :asc, created_at: :desc)
        when "created_at" then scope.order(created_at: sort_direction)
        when "updated_at" then scope.order(updated_at: sort_direction)
        when "due_date" then scope.order(Arel.sql("due_date IS NULL, due_date #{sort_direction}"))
        when "manual" then scope.order(sort_order: :asc)
        else scope.ordered
        end
      end

      def sort_direction
        params[:sort_direction] == "asc" ? :asc : :desc
      end
    end
  end
end
