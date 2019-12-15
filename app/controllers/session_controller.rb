class SessionController < ActionController::Base
  def login
    render 'login'
  end

  def logout
    cookies.delete(:jwt)
    reset_session

    redirect_to logout_url.to_s
  end

  private

  def logout_url
    query = {
      client_id: Settings.auth0.client_id,
      returnTo: root_url
    }

    URI::HTTPS.build(
      host: Settings.auth0.domain,
      path: '/v2/logout',
      query: URI.encode_www_form(query)
    )
  end
end
