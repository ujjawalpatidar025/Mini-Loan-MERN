const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./Routes/auth/authRoutes.js");
const loanRoutes = require("./Routes/loan/loanRoutes.js");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5001;

// Connection to database
const connection = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((err) => {
      console.log(`Error Not connected! ${err}`);
    });
};

//Routes for app
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/loan", loanRoutes);

// Connection to server on Port
app.listen(PORT, () => {
  connection();
  console.log(`connected to Server! at port ${PORT} `);
});
