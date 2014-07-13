if Rails.env == "production"
  BASE_URL = "http://octofly.com/"
else
  BASE_URL = "http://localhost:3000/"
end