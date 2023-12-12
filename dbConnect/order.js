

import mongoose, { Schema } from 'mongoose';

const Client = new Schema({
  CustomerID : Number,
  FullName : String,
  Email : String,
  Mobile : Number,
  Address : String,
  State : String,
  City : String,
  Pincode : Number,
  MealPreference : String,
  Quantity : Number,
  SubscriptionPeriod : String,
  // TotalPayable : Number
});

export const CustomerLists = mongoose.model('customerlists', Client);
