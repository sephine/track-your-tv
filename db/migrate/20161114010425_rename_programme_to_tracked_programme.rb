class RenameProgrammeToTrackedProgramme < ActiveRecord::Migration[5.0]
  def change
    rename_table :programmes, :tracked_programmes
    rename_column :episodes, :programme_id, :tracked_programme_id
  end
end
