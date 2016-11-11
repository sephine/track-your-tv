class ProgrammeInfo < ApplicationRecord
  has_many :programmes, inverse_of: :info, dependent: :destroy
  has_many :posters, inverse_of: :info, dependent: :destroy
  validates :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: true
end
