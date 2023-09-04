//server.js
const path = require('path')
const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const quoteRoute = require('./routes/quoteRoute')
const multer = require('multer')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server connect to PORT:${PORT}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'Connected to server' })
})


// Connect to the database
require('./database/mongodb')

const corsOptions = {
  origin: [
    'http://localhost:3000', // Allow localhost for development
    'https://workout-wise-p9ai5i0p0-keegs4213.vercel.app' // Allow your production domain
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json())

// Routes
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/quote', quoteRoute)

const uploadPath = path.join(__dirname, '..', 'front-end/public/upload')
app.use(express.static(uploadPath))
console.log('Upload path:', uploadPath)
// multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      cb(null, 'front-end/public/upload')
    } catch (error) {
      cb(error)
    }
  },
  filename(req, file, cb) {
    try {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    } catch (error) {
      cb(error)
    }
  },
})

const upload = multer({ storage })

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No photo uploaded' })
  }
  try {
    const filePath = `/upload/${req.file.filename}`;
    res.status(200).json({
      message: 'Photo successfully uploaded',
      filePath: filePath,
    })

    // Update the user's profile image URL
    const userId = req.body.userId; // Get the user id from the request body
    if (userId) {
      const User = require('./models/User');  // Import the User model
      await User.findByIdAndUpdate(
        userId,
        { profileImageUrl: filePath },
        { useFindAndModify: false, new: true }
      );
    }

    res.status(200).json({
      message: 'Photo successfully uploaded',
      filePath: filePath,
    })
  } catch (error) {
    console.log(error)
  }
})




