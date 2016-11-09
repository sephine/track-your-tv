class AddImageToProgramme < ActiveRecord::Migration[5.0]
  def change
    add_column :programmes, :image, :string
  end
end
