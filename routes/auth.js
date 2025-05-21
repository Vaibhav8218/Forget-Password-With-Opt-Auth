const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authcontroller");

router.post("/forget-password", AuthController.forgetPassword);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
