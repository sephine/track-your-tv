class RenameEpisodeToWatchedEpisode < ActiveRecord::Migration[5.0]
  def change
    rename_table :episodes, :watched_episodes
  end
end
