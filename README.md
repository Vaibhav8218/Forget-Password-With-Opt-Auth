# 🔐 Forgot Password with OTP Email Verification API

This is a Node.js + Express-based REST API that provides secure user authentication using OTP (One-Time Password) for resetting passwords. OTP is sent to the user's registered email using Nodemailer. The API also generates a unique `siteId` for each user and assigns a default profile.

---

## 📁 Features

- 🌐 RESTful API with Express
- 📧 Sends OTP to user email using Gmail + Nodemailer
- 🔒 OTP expiry handling (valid for 10 minutes)
- 🔑 Secure password hashing using bcrypt
- 🆔 Auto-generate a unique `siteId` for each user
- 👤 Default user profile creation on new signups
- ✅ Clean error handling and response structure

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **MongoDB** (Mongoose ODM)
- **Nodemailer**
- **bcryptjs**
- **dotenv**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/forgot-password-otp-api.git
cd forgot-password-otp-api**
### 2 Install Dependencies
npm install

📂 Project Structure

├── config/
│   └── db.js
├── models/
│   └── user.js
├── routes/
│   └── auth.js
├── .env
├── server.js
├── package.json
└── README.md
