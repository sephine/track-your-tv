class Poster < ApplicationRecord
  belongs_to :programme_info
  validates :programme_info, :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: true
end
