class Brand < ApplicationRecord
  has_many :products, dependent: :destroy

  TAGS = ['', 'Fabriqué en France 🇫🇷', 'Fait main 🙌', 'Non vendu sur Amazon ❌', 'Produits locaux 📍', 'Upcyclé ♻️', 'Éco-responsable 🌱']
  CATEGORIES = ['', 'Accessoires', 'Beauté', 'Bijoux', 'Épicerie', 'Déco', 'Mode', 'Papeterie', 'Enfants']

  geocoded_by :full_address
  after_validation :geocode

  def full_address
    "#{address_name}, #{zip_code}, #{city_name}"
  end
end
