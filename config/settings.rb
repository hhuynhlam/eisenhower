class Settings
  extend Mixlib::Config

  require 'dotenv/load' if ENV['RAILS_ENV'] == 'development'

  config_context :auth0 do
    default(:client_id, ENV['AUTH0_CLIENT_ID'])
    default(:client_secret, ENV['AUTH0_CLIENT_SECRET'])
    default(:domain, ENV['AUTH0_DOMAIN'])
    default(:issuer, ENV['AUTH0_ISSUER'])
  end

  config_context :mongoid do
    default(:uri, ENV['MONGO_URL'])
  end
end
