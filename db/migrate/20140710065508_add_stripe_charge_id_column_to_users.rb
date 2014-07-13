class AddStripeChargeIdColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :stripe_charge_id,:string
    add_column :users, :status, :string
  end
end
