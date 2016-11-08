class CreateEpisodes < ActiveRecord::Migration[5.0]
  def change
    create_table :episodes do |t|
      t.string :name
      t.decimal :tvdb_ref
      t.boolean :watched
      t.references :programme, foreign_key: true

      t.timestamps
    end
  end
end
