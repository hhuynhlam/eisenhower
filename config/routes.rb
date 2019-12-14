single_page_app = { to: 'ui/root#show', defaults: { format: 'html' } }

Rails.application.routes.draw do
  root single_page_app

  get '/health', to: 'health#show'

  # API
  namespace :api do
    resources :dashboards, only: %w[index]
  end

  # UI
  get '/*path', single_page_app
end
