task :update_database => :environment do
  puts "Automatic database update..."
  result = AutomaticUpdate.update_all
  puts result
  puts "done."
end
