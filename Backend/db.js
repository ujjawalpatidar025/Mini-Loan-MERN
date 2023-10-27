const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connect = async () => {
  try {
    console.log(process.env.MONGO_URL);
    const ress = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("database connected!");
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};

module.exports = connect;
