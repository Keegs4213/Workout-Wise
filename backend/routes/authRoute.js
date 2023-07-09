const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.LoginUser);

module.exports = router;
