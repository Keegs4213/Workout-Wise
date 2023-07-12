// authController.js
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcrypt");

// desc Login user
// route POST /auth/login
exports.LoginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Log the email and password to check their values
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  const user = await User.findOne({ email });

  // Log the user to check if a user was found
  console.log(`User: ${JSON.stringify(user)}`);

  if (user) {
    // Compare the password from the request with the hashed password in the database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log("err: ", err);
      }
      return result;
    });

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      // Save user ID to local storage
      localStorage.setItem("userId", user._id);
      res.status(200).json({
        message: " user logged in!",
        response: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } else {
    res.status(400).json({ message: "Invalid credentials!" });
  }
});

// desc Signup user
// route POST /auth/signup
exports.SignupUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Log the email, username and password to check their values
  console.log(`Username: ${username}`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if a user with the provided email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).json({ message: "User with this email already exists" });
  } else {
    const user = new User({ username, email, password: hashedPassword });

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
