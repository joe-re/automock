require 'pathname'
require 'fileutils'

namespace :automock do
  desc 'Setup automock'
  task :setup, :options do |_, _args|
    dist = Pathname.new('automock')
    dist.mkpath
    src = [
      "#{File.dirname(__FILE__)}/../../server"
    ]
    FileUtils.cp_r(src, dist, remove_destination: true)
    puts "created #{dist}"
    Rake::Task['automock:install'].execute
  end

  task :install, :options do |_, _args|
    Dir.chdir "#{Rails.root}/automock/server"
    sh 'npm install && npm run build'
    sh 'node node_modules/db-migrate/bin/db-migrate up --config app/db/database.json -e dev'
  end

  task :server, :options do |_, _args|
    ap = ENV['automock_port'] || 8000
    rp = ENV['rails_port'] || 3000
    pp = ENV['proxy_port'] || 8001
    mock_data_path = "#{Rails.root}/automock/data"
    Dir.chdir "#{Rails.root}/automock/server"
    sh "./bin/server #{mock_data_path} #{ap} #{rp} #{pp}"
  end
end
