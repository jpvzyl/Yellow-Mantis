Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/register", to: "auth#register"
      post "auth/login", to: "auth#login"
      post "auth/refresh", to: "auth#refresh"
      get "auth/me", to: "auth#me"

      post "workspaces/join", to: "workspaces#join"

      scope ":workspace_slug" do
        resource :workspace, only: [:show, :update], controller: "workspaces" do
          get :members
        end

        resources :teams, param: :id do
          resources :issues do
            collection do
              post :bulk_update
            end
            resources :comments, only: [:index, :create, :update, :destroy]
          end
        end

        resources :labels, only: [:index, :create, :update, :destroy]
        resources :projects
        get "search", to: "search#index"
      end

    end
  end

  get "up", to: proc { [200, {}, ["OK"]] }
end
