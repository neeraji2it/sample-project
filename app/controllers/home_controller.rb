class HomeController < ApplicationController
    def index
    end
  
    def contact_us
        unless request.get?
            params[:name_error] = "Your name can't be blank" if params[:name].to_s.blank?
            params[:email_error] = "Your email can't be blank" if params[:email].to_s.blank?
            #      params[:email_error] = email_error.to_a.compact.join(' and ') if !email_error.empty?
            params[:subject_error] = "Subject can't be blank." if params[:subject].to_s.blank?
            params[:message_error] = "Message can't be blank." if params[:message].to_s.blank?
            @status = false
            if !params[:name].to_s.blank? and !params[:email].to_s.blank? and !params[:subject].to_s.blank? and !params[:message].to_s.blank?
                if simple_captcha_valid?
                    if ContactMailer.send_contact_form(params[:name], params[:email], params[:subject], params[:message]).deliver
                        flash[:success] = "Your message has been successfully sent"
                        params[:name] = params[:email] = params[:subject] = params[:message] = " "
                        @status = true
                    else
                        flash[:danger] = "Error while sending email. Please submit again"
                    end
                else
                    params[:captcha_error] = "Captcha not valide"
                end
            end
            render
        end
    end
end
