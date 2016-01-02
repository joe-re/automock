$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'automock'
RSpec.configure do |config|
  config.before(:all) do
    `rm -rf spec/dummy/automock`
    `bundle exec rspec spec/dummy/spec/requests/dummy_api.rb`
  end

  config.after(:all) do
    `rm -rf spec/dummy/automock`
  end
end
