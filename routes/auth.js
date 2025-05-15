const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateRandomId(length = 16) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

router.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); //10 mint

  let user = await User.findOne({ email });
  if (!user) {
    const siteId = generateRandomId();
    user = await User.create({
      email,
      otp,
      otpExpiry,
      siteId,
      profile: {
        name: "New User",
        avatar: "https://example.com/default-avatar.png",
      },
      siteId: generateRandomId(),
    });
  } else {
    if (!user.siteId) {
      user.siteId = generateRandomId(); // in case existing user doesn't have it
    }

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    console.log("Existing user siteId:", user.siteId); // ✅ Log existing user
  }

  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP is:<b>${otp}</b></p>`,
  });
  res.json({ message: "OTP sent to email" });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  res.json({ message: "OTP verified" });
});

router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "invalid or expired OTP" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();
  res.json({ message: "Password reset successfull" });
});

module.exports = router;
