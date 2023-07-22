//server.js
const path = require("path");
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const quoteRoute = require("./routes/quoteRoute")
const multer = require("multer");
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
app.use("/quote", quoteRoute)


const uploadPath = path.join(__dirname, '..', 'uploads')
app.use(express.static(uploadPath));

// multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      cb(null, "uploads");
    } catch (error) {
      cb(error);
    }
  },
  filename(req, file, cb) {
    try {
    cb(
        null,
        `${file.fieldname}-${Date.now()}${path
          .extname(file.originalname)}`
      );
     
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No photo uploaded" });
  }
  try {
    res.status(200).json({
      message: "Photo successfully uploaded",
      filePath: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log(`Server connect to PORT:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Connected to server" });
});
