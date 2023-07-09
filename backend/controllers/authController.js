const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

//desc Login user
//route POST /auth/login
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
