const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  fitnessGoal: { type: String },
  fitnessLevel: { type: String },
  workoutPlan: { type: Object },
  nutritionPlan: { type: Object }
});

userSchema.methods.validatePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
  if(!this.modifiedPaths('password')) {
    next()
  }
})

module.exports = mongoose.model("User", userSchema);
