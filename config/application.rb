require_relative 'boot'

require 'rails'

require 'action_cable/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'active_job/railtie'
require 'active_model/railtie'
require 'active_storage/engine'
require 'sprockets/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Eisenhower
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Autoload lib classes.
    config.autoload_paths << Rails.root.join('lib')

    # Enable CORS
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '/api/*', headers: :any, methods: :any
      end
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
