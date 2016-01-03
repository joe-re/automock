require 'bundler/gem_tasks'
require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec)

task default: :spec
task :update_mockdata_fixtures do
  system('rm -rf spec/dummy/automock')
  system('AUTOMOCK=1 bundle exec rspec spec/dummy/spec/requests/dummy_api.rb')
  FileUtils.cp_r('spec/dummy/automock/data', 'spec/fixtures/', remove_destination: true)
end
