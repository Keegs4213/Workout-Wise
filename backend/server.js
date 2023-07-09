const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
require("dotenv").config();

const PORT = 3245;

app.use(express.json());
app.use("/users", userRoute);
app.use("/auth", authRoute);

app.use(cors());
let dbConnect = require("./database/mongodb");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server connect to PORT:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Connected to server" });
});
