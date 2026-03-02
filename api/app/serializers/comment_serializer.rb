class CommentSerializer
  def self.render(comment)
    {
      id: comment.id,
      body: comment.body,
      user: UserSerializer.render(comment.user),
      edited_at: comment.edited_at,
      created_at: comment.created_at,
      updated_at: comment.updated_at
    }
  end
end
