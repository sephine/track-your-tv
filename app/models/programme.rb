class Programme < ApplicationRecord
  belongs_to :user
  belongs_to :programme_info
  has_many :episodes, inverse_of: :programme, dependent: :destroy
  validates :user, :programme_info, presence: true
  validates :programme_info, uniqueness: { scope: :user_id, message: "Each series can only be stored once per user." }
end
