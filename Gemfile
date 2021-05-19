source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

gem 'rails', '~> 5.2.0'

gem 'aasm', '~> 5.0'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'jazz_fingers', '~> 4.0'
gem 'jbuilder', '~> 2.9'
gem 'jwt', '~> 2.2'
gem 'mixlib-config', '~> 2.2'
gem 'mongoid', '~> 7.0'
gem 'omniauth-auth0', '~> 2.2'
gem 'pry-rails', '~> 0.3'
gem 'puma', '~> 4.3'
gem 'rack-cors', require: 'rack/cors'
gem 'react-rails', '~> 2.4'
gem 'turbolinks', '~> 5.2'
gem 'uglifier', '~> 4.2'
gem 'webpacker', '~> 3.5'

group :development, :test do
  gem 'dotenv-rails'
  gem 'rspec-rails'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rubocop', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'mongoid-rspec'
  gem 'rails-controller-testing'
  gem 'shoulda-matchers'
end
