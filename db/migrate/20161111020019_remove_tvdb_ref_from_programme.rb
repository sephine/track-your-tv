class RemoveTvdbRefFromProgramme < ActiveRecord::Migration[5.0]
  def change
    remove_column :programmes, :tvdb_ref, :integer
  end
end
