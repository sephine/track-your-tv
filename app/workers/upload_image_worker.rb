class UploadImageWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'default'

  def perform(poster_id)
    poster = Poster.find(poster_id)
    download = open('https://thetvdb.com/banners/' + poster.thumbnail)
    obj = S3_BUCKET.object(poster.tvdb_ref.to_s)
    obj.upload_file(download)
    poster.update({
      url: obj.public_url
    })
  end
end
