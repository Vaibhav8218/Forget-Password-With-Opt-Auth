const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  otp: { type: String },
  otpExpiry: { type: Date },
  siteId: { type: String, default: "" },
});

module.exports = mongoose.model("User", UserSchema);
