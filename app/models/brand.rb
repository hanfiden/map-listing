class Brand < ApplicationRecord
  has_many :products, dependent: :destroy

  TAGS = ['', 'Fabriqué en France 🇫🇷', 'Fait main 🙌', 'Non vendu sur Amazon ❌', 'Produits locaux 📍', 'Upcyclé ♻️', 'Éco-responsable 🌱']
  CATEGORIES = ['', 'Accessoires', 'Beauté', 'Bijoux', 'Épicerie', 'Déco', 'Mode', 'Papeterie', 'Enfants']

  geocoded_by :full_address
  after_validation :geocode

  include PgSearch::Model
  pg_search_scope :full_search,
                  against: %i[category tags city_name],
                  using: {
                    tsearch: { any_word: true }
                  }

  def full_address
    "#{address_name}, #{zip_code}, #{city_name}"
  end
end
