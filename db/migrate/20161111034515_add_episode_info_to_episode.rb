class AddEpisodeInfoToEpisode < ActiveRecord::Migration[5.0]
  def change
    add_reference :episodes, :episode_info, foreign_key: true
  end
end
