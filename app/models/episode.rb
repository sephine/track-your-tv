class Episode < ApplicationRecord
  belongs_to :programme
  validates :programme, :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: { scope: :programme_id, message: "You have already tracked this series." }
end
