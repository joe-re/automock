ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'automock'
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
