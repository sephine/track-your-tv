class UploadImageWorker
  include Sidekiq::Worker

  def perform()
    programme_info_id = 76184
    posters = Poster.where(programme_info_id: programme_info_id)
    posters.each do |poster|
      download = open('https://thetvdb.com/banners/' + poster.thumbnail)
      obj = S3_BUCKET.object(poster.tvdb_ref)
      obj.upload_file(download)
      poster.update({
        url: obj.public_url
      })
    end
  end
end
