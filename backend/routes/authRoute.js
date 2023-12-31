//authRoute.js
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.LoginUser);
router.post("/signup", authController.SignupUser);

module.exports = router;
