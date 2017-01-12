require 'background_work'

task :update_database => :environment do
  puts "Automatic database update..."
  result = BackgroundWork.check_for_updates
  print result
  puts
  puts "...done."
end
