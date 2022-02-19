class BrandsController < ApplicationController
  def index
    @brands = Brand.all
  end

  def show
    @brand = Brand.find(params[:id])
    @products = Product.where(brand_id: @brand.id)
  end
end
