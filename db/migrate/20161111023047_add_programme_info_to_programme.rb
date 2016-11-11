class AddProgrammeInfoToProgramme < ActiveRecord::Migration[5.0]
  def change
    add_reference :programmes, :programme_info, foreign_key: true
  end
end
