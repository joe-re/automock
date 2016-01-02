require 'pathname'
require 'fileutils'

namespace :automock do
  desc 'Setup automock'
  task :setup, :options do |_, args|
    dist = Pathname.new('mock')
    dist.mkpath
    src = [
      "#{File.dirname(__FILE__)}/../../server"
    ]
    FileUtils.cp_r(src, dist, remove_destination: true)
    puts "created #{dist}"
  end

  task :install, :options do |_, args|
    Dir.chdir './automock/server'
    sh 'npm install && npm run build'
    sh 'node node_modules/db-migrate/bin/db-migrate up'
  end
end
