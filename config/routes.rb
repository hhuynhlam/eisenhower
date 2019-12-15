single_page_app = { to: 'ui/root#show', defaults: { format: 'html' } }

Rails.application.routes.draw do
  root single_page_app

  get '/health', to: 'health#show'

  # Authentication
  get '/login' => 'session#login'
  get '/logout' => 'session#logout'

  namespace :auth do
    get '/auth0/callback' => 'auth0#callback'
    get '/auth0/failure' => 'auth0#failure'
  end

  # API
  namespace :api do
    resources :dashboards, only: %w[index]
  end

  # UI
  get '/*path', single_page_app
end
