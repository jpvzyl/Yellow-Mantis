class UserSerializer
  def self.render(user)
    {
      id: user.id,
      email: user.email,
      name: user.name,
      display_name: user.display_name || user.name,
      avatar_url: user.avatar_url,
      timezone: user.timezone,
      theme: user.theme
    }
  end
end
