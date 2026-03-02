module Api
  module V1
    class TeamsController < BaseController
      before_action :set_team, only: [:show, :update, :destroy]

      def index
        teams = current_workspace.teams.includes(:workflow_states).order(:name)
        render json: teams.map { |t| TeamSerializer.render(t) }
      end

      def show
        render json: TeamSerializer.render(@team, view: :detail)
      end

      def create
        team = current_workspace.teams.build(team_params)

        if team.save
          TeamMembership.create!(team: team, user: current_user)
          render json: TeamSerializer.render(team, view: :detail), status: :created
        else
          render json: { errors: team.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @team.update(team_params)
          render json: TeamSerializer.render(@team, view: :detail)
        else
          render json: { errors: @team.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @team.destroy!
        head :no_content
      end

      private

      def set_team
        @team = current_workspace.teams.find_by!(identifier: params[:id]) ||
                current_workspace.teams.find(params[:id])
      end

      def team_params
        params.permit(:name, :identifier, :description, :icon, :color)
      end
    end
  end
end
