module Api
  module V1
    class CommentsController < BaseController
      before_action :set_issue
      before_action :set_comment, only: [:update, :destroy]

      def index
        comments = @issue.comments.includes(:user).order(created_at: :asc)
        render json: comments.map { |c| CommentSerializer.render(c) }
      end

      def create
        comment = @issue.comments.build(comment_params)
        comment.user = current_user

        if comment.save
          render json: CommentSerializer.render(comment), status: :created
        else
          render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @comment.user == current_user && @comment.update(comment_params.merge(edited_at: Time.current))
          render json: CommentSerializer.render(@comment)
        else
          render json: { error: "Cannot edit this comment" }, status: :forbidden
        end
      end

      def destroy
        if @comment.user == current_user
          @comment.destroy!
          head :no_content
        else
          render json: { error: "Cannot delete this comment" }, status: :forbidden
        end
      end

      private

      def set_issue
        @issue = Issue.find(params[:issue_id])
      end

      def set_comment
        @comment = @issue.comments.find(params[:id])
      end

      def comment_params
        params.permit(:body)
      end
    end
  end
end
