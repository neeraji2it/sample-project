class ContactMailer < ActionMailer::Base
    default from: "marketing@octofly.com"
  
    def send_contact_form(name, email, subject, message)
        @name = name
        @email = email
        subject = subject
        @message = message
        mail(:to => "vivek@dine-media.com", :subject => subject)
    end
end
