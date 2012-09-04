class ApplicationController < ActionController::Base
  protect_from_forgery

  protected

  def serialize_array(arr)
    ActiveModel::ArraySerializer.new(arr).as_json(root: false)
  end
end
