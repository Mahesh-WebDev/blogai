class Blog < ApplicationRecord
  validates :title, presence: true, length: { minimum: 10, maximum: 100 }

  validates :body, presence: true, length: { minimum: 100, maximum: 4000 }

  has_one_attached :thumbnail
  after_commit :attach_default_thumbnail, on: %i[create update]
  def attach_default_thumbnail
    unless thumbnail.attached?
      thumbnail.attach(
        io: File.open(Rails.root.join("app", "assets", "images", "default_thumbnail.png")),
        filename: "default_thumbnail.png",
        content_type: "image/png"
      )
    end
  end
end
