const mongoose = require("mongoose");

// const URI = "mongodb://localhost:27017";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.LOCAL_URI);

  console.log(`MongoDB connected:`);
};

module.exports = connectDB;
