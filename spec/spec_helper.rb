$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'automock'
RSpec.configure do |config|
  config.before(:all) do
    `bundle exec rspec spec/dummy/spec/requests/dummy_api.rb`
  end
  config.after(:all) do
  end
end

