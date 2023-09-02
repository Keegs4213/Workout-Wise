//mongodb.js
const Mongoose = require("mongoose");
const uri = "mongodb+srv://keegangreig3:123@cluster0.eso15oc.mongodb.net/?retryWrites=true&w=majority";

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