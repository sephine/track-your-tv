class Token < ApplicationRecord
  validates :text, presence: true
  validates :refreshed, presence: true
end
