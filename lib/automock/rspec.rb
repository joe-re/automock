require 'rspec'

RSpec.configure do |c|
  c.after(:each, automock: true) do |example|
    Automock.append(self, example)
  end

  c.after(:suite) do
    Automock.write
  end
end
