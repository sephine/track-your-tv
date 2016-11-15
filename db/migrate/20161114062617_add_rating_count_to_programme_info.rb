class AddRatingCountToProgrammeInfo < ActiveRecord::Migration[5.0]
  def change
    add_column :programme_infos, :ratingCount, :integer
  end
end
