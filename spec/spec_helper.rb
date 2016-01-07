$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'automock'

RSpec.configure do |config|
  config.before(:all) do
    system('bundle exec rake update_mockdata_fixtures')
  end
end
