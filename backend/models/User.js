//models/User.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fitnessGoal: { type: String },
  fitnessLevel: { type: String },
  workoutPlan: { type: Object },
  nutritionPlan: { type: Object },
});

module.exports = mongoose.model("User", userSchema);
