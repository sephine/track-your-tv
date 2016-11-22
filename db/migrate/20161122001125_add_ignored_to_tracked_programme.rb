class AddIgnoredToTrackedProgramme < ActiveRecord::Migration[5.0]
  def change
    add_column :tracked_programmes, :ignored, :boolean
  end
end
