class Rack::Attack
  # Throttle all requests by IP (300 requests per 5 minutes)
  throttle("req/ip", limit: 300, period: 5.minutes) do |req|
    req.ip unless req.path.start_with?("/assets")
  end

  # Stricter throttle for auth endpoints (5 attempts per 20 seconds)
  throttle("auth/ip", limit: 5, period: 20.seconds) do |req|
    req.ip if req.path.start_with?("/api/v1/auth/login") && req.post?
  end

  # Throttle OAuth attempts (10 per minute)
  throttle("oauth/ip", limit: 10, period: 1.minute) do |req|
    req.ip if req.path.include?("/vault/oauth")
  end

  # Throttle Gmail API calls per account (60 per minute)
  throttle("gmail/token", limit: 60, period: 1.minute) do |req|
    if req.path.include?("/gmail/") && req.env["HTTP_AUTHORIZATION"].present?
      token = req.env["HTTP_AUTHORIZATION"].split(" ").last
      "gmail:#{Digest::SHA256.hexdigest(token)[0..15]}"
    end
  end

  # Throttle document uploads (20 per hour)
  throttle("uploads/ip", limit: 20, period: 1.hour) do |req|
    req.ip if req.path.include?("/vault/") && req.path.include?("/documents") && req.post?
  end

  # Block suspicious requests
  blocklist("block/bad-agents") do |req|
    Rack::Attack::Fail2Ban.filter("bad-agents:#{req.ip}", maxretry: 3, findtime: 10.minutes, bantime: 1.hour) do
      CGI.unescape(req.query_string).match?(/(<script|union\s+select|;.*drop\s+table)/i)
    end
  end

  self.throttled_responder = lambda do |_env|
    [429, { "Content-Type" => "application/json" }, [{ error: "Rate limit exceeded. Please retry later." }.to_json]]
  end
end
