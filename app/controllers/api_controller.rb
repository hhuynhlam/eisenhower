class ApiController < ActionController::Base
  before_action :authenticate

  def authenticate
    token = String(request.env['HTTP_AUTHORIZATION']).slice(7..-1)
    @auth_payload, @auth_header = JsonWebToken.verify(token)
  rescue JWT::DecodeError => e
    render(status: 401, json: { error: e.class, message: e.message })
  end

  def current_user
    @auth_payload
  end
end
