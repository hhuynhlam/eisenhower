class ApplicationController < ActionController::Base
  before_action :authenticate

  def authenticate
    redirect_to '/login' unless session[:userinfo].present?
  end

  def current_user
    session[:userinfo]&.[]('extra')
                      &.[]('raw_info')
                      &.with_indifferent_access
  end
end
