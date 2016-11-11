class EpisodeInfo < ApplicationRecord
  belongs_to :programme_info
  has_many :episodes, inverse_of: :info, dependent: :destroy
  validates :programme_info, :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: true
end
