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

      # Company Vault
      namespace :vault do
        resources :businesses do
          member do
            post :archive
            post :unarchive
          end
          collection do
            patch :reorder
          end

          resources :pages do
            member do
              post :toggle_pin
            end
            collection do
              patch :reorder
            end
          end

          resources :documents, only: [:index, :create, :show, :destroy] do
            member do
              get :download
            end
          end
        end

        # Gmail (explicit paths to avoid nesting issues)
        get "businesses/:business_id/accounts/:account_id/gmail/messages", to: "gmail#messages"
        get "businesses/:business_id/accounts/:account_id/gmail/messages/:message_id", to: "gmail#show_message"
        get "businesses/:business_id/accounts/:account_id/gmail/labels", to: "gmail#labels"
        post "businesses/:business_id/accounts/:account_id/gmail/messages/:message_id/read", to: "gmail#mark_read"
        post "businesses/:business_id/accounts/:account_id/gmail/messages/:message_id/archive", to: "gmail#archive"
        post "businesses/:business_id/accounts/:account_id/gmail/send", to: "gmail#send_message"

        # Cursor Chats
        resources :cursor_chats, only: [:index, :show, :update] do
          member do
            get :messages
            post :assign
            post :star
          end
          collection do
            get :scan
            post :import
            post :sync
            get :projects
          end
        end

        # OAuth flows
        get "oauth/google/authorize", to: "oauth#google_authorize"
        get "oauth/google/callback", to: "oauth#google_callback"
        delete "oauth/google/revoke", to: "oauth#revoke"

        # Audit logs
        get "audit-logs", to: "audit_logs#index"
      end
    end
  end

  get "up", to: proc { [200, {}, ["OK"]] }
end
