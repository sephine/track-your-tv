require 'thetvdb'

class AutomaticUpdate
  #calls update in thetvdb api to find all series that have been
  #updated in the timeframe and updates them in the database.
  def self.check_for_updates
    epoch_start = ThetvdbUpdate.all.first.update_start
    epoch_now = Time.now.to_i
    tvdb_refs_to_check = []
    (epoch_start..epoch_now).step(518400) do |epoch_step|
      response = TheTVDB.update(epoch_step)
      return if response.code == 401
      if response.include?('data') && response['data'] != nil
        response['data'].each do |record|
          tvdb_refs_to_check << record['id']
        end
      end
    end

    search = ProgrammeInfo.where(tvdb_ref: tvdb_refs_to_check)
    updated = []
    search.each do |programme_info|
      programme_info.update_from_tvdb
      updated << [programme_info.tvdb_ref, programme_info.seriesName]
    end

    ThetvdbUpdate.destroy_all
    thetvdb_update = ThetvdbUpdate.new(update_start: epoch_now)
    thetvdb_update.save

    updated
  end
end
