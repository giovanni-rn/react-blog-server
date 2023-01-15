const mongoose = require("mongoose"); // import mongoose to connect to database
mongoose.set("strictQuery", true); // only update existing fields in schema

module.exports.connectToMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
