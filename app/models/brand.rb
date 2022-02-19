class Brand < ApplicationRecord
  has_many :products, dependent: :destroy

  TAGS = ['', 'Fabriqué en France 🇫🇷', 'Fait main 🙌', 'Non vendu sur Amazon ❌', 'Produits locaux 📍', 'Upcyclé ♻️', 'Éco-responsable 🌱']
  CATEGORIES = ['', 'Accessoires', 'Beauté', 'Bijoux', 'Épicerie', 'Déco', 'Mode', 'Papeterie', 'Enfants']
end
