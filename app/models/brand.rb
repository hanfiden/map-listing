class Brand < ApplicationRecord
  has_many :products, dependent: :destroy

  TAGS = ['', 'Fabriqué en France 🇫🇷', 'Fait main 🙌', 'Non vendu sur Amazon ❌', 'Produits locaux 📍', 'Upcyclé ♻️', 'Éco-responsable 🌱']
  CATEGORIES = ['', 'Accessoires', 'Beauté', 'Bijoux', 'Épicerie', 'Déco', 'Mode', 'Papeterie', 'Enfants']

  geocoded_by :full_address
  after_validation :geocode

  include PgSearch
  pg_search_scope :advanced_search, (lambda do |args, query|
    return {
      against: args, query: query
    }
  end)

  def full_address
    "#{address_name}, #{zip_code}, #{city_name}"
  end
end
