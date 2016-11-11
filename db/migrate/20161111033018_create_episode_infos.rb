class CreateEpisodeInfos < ActiveRecord::Migration[5.0]
  def change
    create_table :episode_infos do |t|
      t.integer :tvdb_ref
      t.integer :episode_number
      t.integer :season_number
      t.string :episodeName
      t.string :firstAired
      t.text :overview
      t.references :programme_info, foreign_key: true

      t.timestamps
    end
    add_index :episode_infos, :tvdb_ref, unique: true
  end
end
