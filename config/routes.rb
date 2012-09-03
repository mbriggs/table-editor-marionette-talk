TableEditor::Application.routes.draw do
  resources :widgets do
    collection do
      get 'old' => 'widgets#old_index'
    end
  end

  root to: 'widgets#index'
end
