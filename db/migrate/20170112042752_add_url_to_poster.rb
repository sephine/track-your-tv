class AddUrlToPoster < ActiveRecord::Migration[5.0]
  def change
    add_column :posters, :url, :string
  end
end
