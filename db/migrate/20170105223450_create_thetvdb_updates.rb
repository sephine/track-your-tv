class CreateThetvdbUpdates < ActiveRecord::Migration[5.0]
  def change
    create_table :thetvdb_updates do |t|
      t.integer :update_start

      t.timestamps
    end
  end
end
