require 'faker'

Product.destroy_all
Brand.destroy_all

Faker::Config.locale = 'fr'

puts 'Creating 16 fake brands...'

brand_one = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: ['7', '14'].sample,
  address_name: '22 Rue de Malville',
  city_name: 'Nantes',
  zip_code: '44100',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand_one.id
  )
end

brand2 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '2 Rue de la Biscuiterie',
  city_name: 'Nantes',
  zip_code: '44000',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand2.id
  )
end

brand3 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '182, Rte de Vannes',
  city_name: 'Orvault',
  zip_code: '44700',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand3.id
  )
end

brand4 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '4 Rue Éric Tabarly',
  city_name: 'Nantes',
  zip_code: '44000',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand4.id
  )
end

brand5 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '160 Rue Jean Baptiste Vigier',
  zip_code: '44400',
  city_name: 'Rezé',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand5.id
  )
end

brand6 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: 'Rue de la Guérinière',
  zip_code: '44340',
  city_name: 'Bouguenais',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand6.id
  )
end

brand7 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '33 Rue Marie Curie',
  zip_code: '44230',
  city_name: 'Saint-Sébastien-sur-Loire',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand7.id
  )
end

brand8 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '226 Bd de la Loire',
  zip_code: '44115',
  city_name: 'Basse-Goulaine',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand8.id
  )
end

brand9 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '129 Rue du Landreau',
  city_name: 'Nantes',
  zip_code: '44300',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand9.id
  )
end

brand10 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '2 Rue Hélène Boucher',
  zip_code: '44700',
  city_name: 'Orvault',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand10.id
  )
end

brand11 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '24 Rue de Sèvres',
  zip_code: '75007',
  city_name: 'Paris',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand11.id
  )
end

brand12 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '11 Av. du Président Wilson',
  zip_code: '75116',
  city_name: 'Paris',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand12.id
  )
end

brand13 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '60 Rue Réaumur',
  zip_code: '75003',
  city_name: 'Paris',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand13.id
  )
end

brand14 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: '2 Av. Gordon Bennett',
  zip_code: '75016',
  city_name: 'Paris',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand14.id
  )
end

brand15 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: 'Av. Daumesnil',
  zip_code: '75012',
  city_name: 'Paris',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand15.id
  )
end

brand16 = Brand.create!(
  name: Faker::Company.name,
  minimum_purchase_amount: [100, 150, 200, 250, 300].sample,
  description: Faker::Lorem.paragraphs.join('<br>'),
  logo_url: "https://picsum.photos/500/300?random=#{rand(1..50)}",
  delivery_time_limit: [7, 14].sample,
  address_name: 'Pl. Saint-Sernin',
  zip_code: '31000',
  city_name: 'Toulouse',
  tags: Brand::TAGS.sample(rand(1..5)),
  category: Brand::CATEGORIES.sample
)

rand(3..5).times do
  Product.create!(
    name: Faker::Coffee.blend_name,
    description: Faker::Coffee.notes,
    product_price: [10, 15, 20, 25, 30, 50, 100].sample,
    brand_id: brand16.id
  )
end

puts 'All done !'
