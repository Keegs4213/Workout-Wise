//server.js
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
require("dotenv").config();

const app = express();
const PORT = 3245;

// Connect to the database
require("./database/mongodb");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server connect to PORT:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Connected to server" });
});
