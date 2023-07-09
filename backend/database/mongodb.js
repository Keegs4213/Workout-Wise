//mongodb.js
const Mongoose = require("mongoose");
const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/WorkoutWise";

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

//Connect to MongoDB
Mongoose.connect(uri, mongooseOptions)
.then(() => console.log("MongoDB Connected"))
.catch((error) => console.log("MongoDB Error: " + error.message));

//Default connection
const db = Mongoose.connection;

//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));


exports.Mongoose = Mongoose;