require 'automatic_update'

task :update_database => :environment do
  puts "Automatic database update..."
  result = AutomaticUpdate.update_all
  print result
  puts
  puts "...done."
end
