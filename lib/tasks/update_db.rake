task :update_all_database => :environment do
  puts "Update all programmes..."
  ProgrammeInfo.all.each do |programme_info|
    UpdateProgrammeWorker.perform_async(programme_info.id)
  end
end
