class CreatePosters < ActiveRecord::Migration[5.0]
  def change
    create_table :posters do |t|
      t.integer :tvdb_ref
      t.string :thumbnail
      t.float :rating_average
      t.references :programme_info, foreign_key: true

      t.timestamps
    end
    add_index :posters, :tvdb_ref, unique: true
  end
end
