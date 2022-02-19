class CreateBrands < ActiveRecord::Migration[6.1]
  def change
    create_table :brands do |t|
      t.string :name
      t.text :description
      t.string :logo_url
      t.integer :minimum_purchase_amount
      t.string :delivery_time_limit
      t.string :address_name
      t.string :zip_code
      t.string :city_name
      t.float :latitude
      t.float :longitude
      t.string :tags, array: true, default: []
      t.string :category

      t.timestamps
    end
  end
end
