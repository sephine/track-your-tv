require 'automatic_update'

task :update_database => :environment do
  puts "Automatic database update..."
  result = AutomaticUpdate.check_for_updates
  print result
  puts
  puts "...done."
end
