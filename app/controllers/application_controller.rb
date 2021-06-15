class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
  
    def authenticate_user
      user_email = request.headers["X-Auth-Email"]
      user = user_email && User.find_by_email(user_email)
      
      if user
        @current_user = user
      else
        render status: :unauthorized, json: { errors: [t('session.could_not_auth')] }
      end
    end
      
    private
      def current_user
        @current_user
      end
  end
  