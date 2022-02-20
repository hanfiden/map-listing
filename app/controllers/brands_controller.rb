class BrandsController < ApplicationController
  def index
    check_query.present? ? set_search : @brands = Brand.all
    set_markers

    respond_to do |format|
      format.html
      format.json { render json: @brands }
    end
  end

  def show
    @brand = Brand.find(params[:id])
    @products = Product.where(brand_id: @brand.id)
  end

  private

  def set_markers
    @markers = @brands.geocoded.map do |brand|
      {
        lat: brand.latitude,
        lng: brand.longitude,
        info_window: render_to_string(partial: 'info_window', locals: { brand: brand })
      }
    end
  end

  def check_query
    true if params[:category].present? || params[:tags].present? || params[:city_name].present?
  end

  def set_search
    @brands = Brand.advanced_search(%i[category tags city_name], [params[:category], params[:tags], params[:city_name]])
  end
end
