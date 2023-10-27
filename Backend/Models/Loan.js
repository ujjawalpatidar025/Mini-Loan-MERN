const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const LoanSchema = new Schema(
  {
    requestid: {
      type: String,
    },
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
    status: {
      type: String,
      defualt: "Pending",
    },
    installments: [
      {
        am: {
          type: String,
        },
        dt: {
          type: String,
        },
        status: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Loan = mongoose.model("loan", LoanSchema);
module.exports = Loan;
