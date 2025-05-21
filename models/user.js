// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   otp: { type: String },
//   otpExpiry: { type: Date },
//   siteId: { type: String, default: "" },
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    siteId: {
      type: String,
      default: "",
    },
    profile: {
      name: {
        type: String,
        default: "New User",
      },
      avatar: {
        type: String,
        default: "https://example.com/default-avatar.png",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", UserSchema);
