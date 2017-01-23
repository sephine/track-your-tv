task :repair_database => :environment do
  puts "Add images for all posters to s3 and add url to database..."
  Poster.all.each do |poster|
    if poster.url == nil
      UploadImageWorker.perform_async(poster.id)
    end
  end
  puts "...done."
end
