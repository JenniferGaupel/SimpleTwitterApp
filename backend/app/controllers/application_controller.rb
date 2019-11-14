class ApplicationController < ActionController::API
    def not_found
        render json: { error: 'not_found' }
      end
    
      def authorize_request
        if request.headers['Authorization'] == nil
          render json: {errors: "Access Denied, no authorization in header"}, status: :unauthorized
        else  
          p request.headers['Authorization']
          header = request.headers['Authorization']
          header = header.split(' ').last if header
          begin
            @decoded = JsonWebToken.decode(header)
            @current_user = User.find(@decoded[:user_id])
          rescue ActiveRecord::RecordNotFound => e
            render json: { errors: e.message }, status: :unauthorized
          rescue JWT::DecodeError => e
            render json: { errors: e.message }, status: :unauthorized
          end
        end
      end
end
