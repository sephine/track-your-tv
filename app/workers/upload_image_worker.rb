class UploadImageWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'default'

  def perform(poster_id)
    poster = Poster.find(poster_id)
    poster.upload_image
  end
end
