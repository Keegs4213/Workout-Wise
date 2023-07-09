// authController.js
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

// desc Login user
// route POST /auth/login
exports.LoginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    if (user.password === req.body.password) {
      res.status(200).json({
        message: " user logged in!",
        response: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400);
      throw new Error("invalid password");
    }
  } else {
    console.log("INVALID CREDENTIALS!");
  }
});

// desc Signup user
// route POST /auth/signup
exports.SignupUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if a user with the provided email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).json({ message: "User with this email already exists" });
  } else {
    const user = new User({ username, email, password });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      message: "User signed up successfully",
      response: {
        _id: user._id,
        name: user.username,
        email: user.email,
      },
    });
  }
});
