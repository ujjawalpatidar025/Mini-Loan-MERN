const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RequestSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    term: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("requests", RequestSchema);
module.exports = Request;
