class Auth::Auth0Controller < ActionController::Base
  def callback
    session[:userinfo] = request.env['omniauth.auth']
    token = session[:userinfo]['credentials']['id_token']
    cookies[:jwt] = { value: token }

    # FIXME: Create a TodoList for new users. This will be deprecated when
    # TodoLists CRUD is supported.
    user_id = session[:userinfo]['extra']['raw_info']['sub']
    TodoList.create(name: 'My List', user_id: user_id) if TodoList.where(user_id: user_id).empty?

    redirect_to '/health'
  end

  def failure
    @error_msg = request.params['message']
  end
end
