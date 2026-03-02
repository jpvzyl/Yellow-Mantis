module Api
  module V1
    class SearchController < BaseController
      def index
        query = params[:q].to_s.strip
        return render json: { issues: [], projects: [] } if query.blank?

        team_ids = current_workspace.team_ids
        issues = Issue.where(team_id: team_ids)
                      .search(query)
                      .includes(:state, :assignee, :team)
                      .limit(20)

        projects = current_workspace.projects
                                    .where("name ILIKE ?", "%#{query}%")
                                    .limit(10)

        render json: {
          issues: issues.map { |i| IssueSerializer.render(i) },
          projects: projects.map { |p| ProjectSerializer.render(p) }
        }
      end
    end
  end
end
