class Programme < ApplicationRecord
  belongs_to :user
  has_many :episodes, dependent: :destroy
  validates :user_id, uniqueness: { scope: :tvdb_ref, message: "Each episode can only be stored once per series per user." }
end
