class CreateProgrammeInfos < ActiveRecord::Migration[5.0]
  def change
    create_table :programme_infos do |t|
      t.integer :tvdb_ref
      t.string :seriesName
      t.string :status
      t.string :firstAired
      t.string :network
      t.string :runtime
      t.string :genre
      t.text :overview
      t.integer :lastUpdated
      t.string :airsDayOfWeek
      t.string :airsTime
      t.string :imdbID

      t.timestamps
    end
    add_index :programme_infos, :tvdb_ref, unique: true
  end
end
