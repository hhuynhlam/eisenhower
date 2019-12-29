single_page_app = { to: 'ui/root#show', defaults: { format: 'html' } }

Rails.application.routes.draw do
  root single_page_app

  get '/health', to: 'health#show'

  # API
  namespace :api do
    resources :todo_items do
      member do
        post 'complete'
        post 'reopen'
      end
    end

    resources :todo_lists
  end

  # Authentication
  get '/login' => 'session#login'
  get '/logout' => 'session#logout'

  namespace :auth do
    get '/auth0/callback' => 'auth0#callback'
    get '/auth0/failure' => 'auth0#failure'
  end

  # UI
  get '/*path', to: redirect('/')
end
