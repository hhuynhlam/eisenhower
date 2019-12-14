class Settings
  extend Mixlib::Config

  require 'dotenv/load' if ENV['RAILS_ENV'] == 'development'

  config_context :mongoid do
    default(:uri, ENV['MONGO_URL'])
  end
end
