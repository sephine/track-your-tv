class RemoveNameFromProgramme < ActiveRecord::Migration[5.0]
  def change
    remove_column :programmes, :name, :string
  end
end
