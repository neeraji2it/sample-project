class AdminsController < ApplicationController
  http_basic_authenticate_with name: "octofly", password: "123123123"
     
  def index
    @users = User.all
  end
  
  def refund_amount
    @user = User.find(params[:id])
    charge = Stripe::Charge.retrieve(@user.stripe_charge_id)
    charge.refund
    
    @user.update(:status => "Refunded")
    flash[:notice] = "Refund successful."
    redirect_to admins_path
  end
end
