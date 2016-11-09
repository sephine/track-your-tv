class Programme < ApplicationRecord
  belongs_to :user
  has_many :episodes, inverse_of: :programme, dependent: :destroy
  validates :user, :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: { scope: :user_id, message: "Each episode can only be stored once per series per user." }
end
