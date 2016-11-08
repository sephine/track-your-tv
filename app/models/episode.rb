class Episode < ApplicationRecord
  belongs_to :programme
  validates :programme_id, uniqueness: { scope: :tvdb_ref, message: "You have already tracked this series." }
end
