class User < ApplicationRecord
  include Mongoid::Document

  has_many :charts, dependent: :destroy

  has_many :clients, class_name: 'User', dependent: :nullify
  belongs_to :trainer, class_name: 'User', optional: true

  field :active, type: Boolean, default: true

  ##############################################################################
  # DEVISE
  ##############################################################################

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, and :omniauthable

  # Disable modules: :registerable, :recoverable
  devise :database_authenticatable, :rememberable, :trackable, :validatable

  ## Database authenticatable
  field :email,              type: String, default: ''
  field :encrypted_password, type: String, default: ''

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :current_sign_in_at, type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_at,    type: Time
  field :last_sign_in_ip,    type: String
  field :sign_in_count,      type: Integer, default: 0

  ## Recoverable
  # field :reset_password_token,   type: String
  # field :reset_password_sent_at, type: Time

  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time

  # FIXME: temporary workaround for undefined method error when saving record
  #        in Rails Admin (https://github.com/plataformatec/devise/issues/4542)
  def will_save_change_to_email?; end

  ##############################################################################
  # Knock
  ##############################################################################

  alias authenticate valid_password?

  ##############################################################################
  # Roles
  ##############################################################################

  rolify

  ##############################################################################
  # Alias
  ##############################################################################

  alias_attribute :flipper_id, :email          # for flipper gates
  alias_attribute :title, :email               # for rails admin
end
