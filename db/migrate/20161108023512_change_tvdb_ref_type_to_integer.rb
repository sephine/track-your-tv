class ChangeTvdbRefTypeToInteger < ActiveRecord::Migration[5.0]
  def change
    change_column :programmes, :tvdb_ref, :integer
    change_column :episodes, :tvdb_ref, :integer
  end
end
