class Auth::Auth0Controller < ActionController::Base
  def callback
    session[:userinfo] = request.env['omniauth.auth']
    token = session[:userinfo]['credentials']['id_token']
    cookies[:jwt] = { value: token, httponly: true }

    redirect_to '/health'
  end

  def failure
    @error_msg = request.params['message']
  end
end
