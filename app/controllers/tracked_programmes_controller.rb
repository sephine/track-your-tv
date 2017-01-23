require 'thetvdb'

class TrackedProgrammesController < ApplicationController

  def index
    programmes = []
    current_user.tracked_programmes.each do |programmeObject|
      programmeJSON = programmeObject.programme_info.as_json(:only => [:tvdb_ref, :seriesName, :status])
      search = Poster.where(tvdb_ref: programmeObject[:image])
      if search.length > 0
        programmeJSON[:image_url] = search[0].url != nil ? \
            search[0].url : "https://thetvdb.com/banners/" + search[0].thumbnail
      end
      programmeJSON[:ignored] = programmeObject[:ignored]

      unless programmeJSON[:ignored]
        offset = params[:timezone_offset].to_i*60
        if programmeObject.programme_info.airsTime != "" && programmeObject.programme_info.airsTime != nil
          time = Time.parse(programmeObject.programme_info.airsTime)
          offset += time.to_i - time.beginning_of_day.to_i
        end

        airedEpisodes = programmeObject.programme_info.episode_infos.aired(offset).count
        watchedEpisodes = programmeObject.programme_info.episode_infos.aired(offset) \
            .joins(:watched_episodes).where('tracked_programme_id = ?', programmeObject.id).count
        unwatchedEpisodes = airedEpisodes - watchedEpisodes
        programmeJSON[:unwatched_episodes] = unwatchedEpisodes

        if unwatchedEpisodes != 0
          lastUpdated = programmeObject.watched_episodes.last_updated
          programmeJSON[:lastUpdated] = lastUpdated
        elsif unwatchedEpisodes == 0 && programmeJSON[:status] != "Ended"
          #the next air date of an unwatched episode.
          nextAirDate = programmeObject.programme_info.episode_infos.where.not(
              id: programmeObject.watched_episodes.select(:episode_info_id)).next_air_date(offset)
          if nextAirDate != nil
            combinedString = nextAirDate
            if programmeObject.programme_info.airsTime != nil
              combinedString += " " + programmeObject.programme_info.airsTime
            end
            nextAirDateAndTime = DateTime.parse(combinedString)
            programmeJSON[:nextAirDate] = "#{nextAirDateAndTime.year}-#{nextAirDateAndTime.month}-#{nextAirDateAndTime.day}-#{nextAirDateAndTime.hour}-#{nextAirDateAndTime.min}"
          end
        end
      end
      programmes << programmeJSON
    end

    respond_to do |format|
      format.json { render :json => programmes }
    end
  end

  def show
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    programmeObject = nil
    success = true
    if search.length > 0
      programmeObject = search[0]
    else
      programmeObject = ProgrammeInfo.create_from_tvdb(params[:series_id], false)
      success = false if programmeObject == nil
    end

    programmeJSON = nil
    if success
      programmeJSON = programmeObject.as_json(:except => [:id, :lastUpdated, :created_at, :updated_at])
      programmeJSON[:episodes] = programmeObject.episode_infos.as_json(:except => [:programme_info_id,  :created_at, :updated_at])
      programmeJSON[:episodes].each do |episode|
        episode[:watched] = false
      end
      programmeJSON[:posters] = programmeObject.posters.as_json(:only => [:tvdb_ref, :rating_average, :thumbnail, :url])
      search = current_user.tracked_programmes.where(programme_info_id: programmeObject[:id])
      if search.length > 0
        programmeJSON[:image] = search[0][:image]
        programmeJSON[:ignored] = search[0][:ignored]
        programmeJSON[:tracked] = true
        watched_episodes = search[0].watched_episodes
        watched_set = search[0].watched_episodes.map {|x| x[:episode_info_id]}.to_set
        programmeJSON[:episodes].each do |episode|
          episode[:watched] = watched_set.include?(episode['id'])
        end
      else
        programmeJSON[:tracked] = false
      end
    end

    respond_to do |format|
      if success
        format.json { render :json => programmeJSON }
      else
        format.json { render json: nil, status: 400 }
      end
    end
  end

  def create
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    success = false
    if search.length > 0
      programme = current_user.tracked_programmes.new({
        programme_info_id: search[0].id,
        image: params[:image],
        ignored: false
      });
      success = true if programme.save
    end

    if success
      respond_to do |format|
        format.json { render json: nil, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: nil, status: 400 }
      end
    end
  end

  def update
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    success = false
    if search.length > 0
      search = current_user.tracked_programmes.where(programme_info_id: search[0].id)
      if search.length > 0
        updated = search[0].update({
          image: params[:image],
          ignored: params[:ignored]
        });
        success = true if updated
      end
    end

    if success
      respond_to do |format|
        format.json { render json: nil, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: nil, status: 400 }
      end
    end
  end

  def delete
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    success = false
    if search.length > 0
      search = current_user.tracked_programmes.where(programme_info_id: search[0].id)
      if search.length > 0
        success = true if search[0].destroy
      end
    end

    if success
      respond_to do |format|
        format.json { render json: nil, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: nil, status: 400 }
      end
    end
  end
end
