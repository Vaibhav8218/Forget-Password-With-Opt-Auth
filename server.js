// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const bodyParser = require("body-parser");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(bodyParser.json());

// app.use("/api/auth", require("./controllers/authcontroller"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${5000}`));

// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
