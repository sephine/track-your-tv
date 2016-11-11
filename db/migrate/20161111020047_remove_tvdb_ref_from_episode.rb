class RemoveTvdbRefFromEpisode < ActiveRecord::Migration[5.0]
  def change
    remove_column :episodes, :tvdb_ref, :integer
  end
end
