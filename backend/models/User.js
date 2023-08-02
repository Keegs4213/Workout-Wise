//models/User.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fitnessGoal: { type: String },
  fitnessLevel: { type: String },
  profileImageUrl: { type: String, default: 'upload/sample.jpg'},
  weight: { type: Number, default: 0},
  height: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
