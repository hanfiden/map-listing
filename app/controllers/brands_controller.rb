class BrandsController < ApplicationController
  def index
    @brands = Brand.all

    @markers = @brands.geocoded.map do |brand|
      {
        lat: brand.latitude,
        lng: brand.longitude,
        info_window: render_to_string(partial: 'info_window', locals: { brand: brand })
      }
    end
  end

  def show
    @brand = Brand.find(params[:id])
    @products = Product.where(brand_id: @brand.id)
  end
end
