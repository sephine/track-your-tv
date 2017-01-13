class UploadImageWorker
  include Sidekiq::Worker

  def perform()
    Rails.logger("DONE!!")
  end

  def temp(programme_info_id)
    posters = Poster.where(programme_info_id: programme_info_id)
    Rails.logger(posters.inspect)
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
