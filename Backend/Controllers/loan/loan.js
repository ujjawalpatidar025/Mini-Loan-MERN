const Loan = require("../../Models/Loan.js");
const Request = require("../../Models/Request.js");

// controller for creating loan request

const create = async (req, res) => {
  const { amount, term, _id } = req.body;

  try {
    if (!amount && !term) {
      res
        .status(400)
        .json({ status: "false", message: "All fields are required" });
    } else {
      const response = new Request({ userid: _id, amount, term });
      await response.save();

      if (!response) {
        res
          .status(500)
          .json({ status: "false", message: "Internal Server Error" });
      } else {
        let tot = amount;
        const arr = [];
        let remain = Number((amount / term).toFixed(2));
        let date = new Date();

        // Add 7 Days
        date.setDate(date.getDate() + 7);
        let c = date;
        for (let i = 0; i < term; i++) {
          const obj = {
            dt: "",
            am: 0,
            status: "Pending",
          };
          let d = c.toLocaleDateString();
          let a = remain;
          tot -= remain;
          obj.dt = d;
          obj.am = remain;
          arr.push(obj);
          date.setDate(date.getDate() + 7);
          c = date;
        }
        Math.round(tot, 2);
        arr[term - 1].am = Number(
          (Number(tot) + Number(arr[term - 1].am)).toFixed(2)
        );

        const result = new Loan({
          amount,
          requestid: response._id,
          userid: _id,
          term,
          status: "Pending",
          installments: arr,
        });
        await result.save();
        if (!result) {
          res
            .status(500)
            .json({ status: "false", message: "Internal Server Error" });
        } else {
          res
            .status(200)
            .json({ status: "true", message: "Loan Created Successfully" });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "false", message: err });
  }
};

//controller for Fetching all the Loans

const getloans = async (req, res) => {
  try {
    const data = await Loan.find();
    if (!data) {
      res.status(404).json({ status: "false", message: "Data not Found" });
    } else {
      res.status(200).json({ status: "true", message: "Data Found", data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "false", message: err });
  }
};

//controller for Fetching all the Loans requests

const getrequests = async (req, res) => {
  try {
    const data = await Request.find();
    if (!data) {
      res.status(404).json({ status: "false", message: "Data not Found" });
    } else {
      res.status(200).json({ status: "true", message: "Data Found", data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "false", message: err });
  }
};

//controller for the approving the request loans from the admin side

const approve = async (req, res) => {
  const { id } = req.body;
  try {
    const updation = await Loan.updateOne(
      { requestid: id },
      {
        $set: {
          status: "Not paid",
        },
      }
    );
    if (!updation) {
      res
        .status(500)
        .json({ status: "false", message: "Internal Server Error" });
    } else {
      const deletion = await Request.deleteOne({ _id: id });
      if (!deletion) {
        res
          .status(500)
          .json({ status: "false", message: "Internal Server Error" });
      } else {
        res
          .status(200)
          .json({ status: "true", message: "Request Approved Successfully" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "false", message: "Internal Server Error" });
  }
};

//controller for getting loan from id

const getloanid = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await Loan.findById({ _id: id });
    if (!response) {
      res.status(404).json({ status: "false", message: "Data not Found" });
    } else {
      res.status(200).json({
        status: "true",
        message: "Data Fetched Successfully",
        data: response,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "false", message: "Internal Server Error" });
  }
};

//controller for loan payment completion

const payment = async (req, res) => {
  const { installmentid, loanid } = req.body;
  try {
    const record = await Loan.findById({ _id: loanid });
    const arr = record.installments;
    let count = 0;
    arr.map((item) => {
      if (item._id == installmentid) {
        item.status = "Paid";
      }
      if (item.status == "Paid") {
        count++;
      }
    });
    const response = await Loan.updateOne(
      { _id: loanid },
      {
        $set: {
          installments: arr,
        },
      }
    );
    if (!response) {
      res
        .status(400)
        .json({ status: "false", message: "Something went wrong" });
    } else {
      if (count == record.term) {
        const result = await Loan.updateOne(
          { _id: loanid },
          {
            $set: {
              status: "Paid",
            },
          }
        );
        if (!result) {
          res
            .status(400)
            .json({ status: "false", message: "Something went wrong" });
        } else {
          res
            .status(200)
            .json({ status: "true", message: "Installment Paid Successfully" });
        }
      } else {
        res
          .status(200)
          .json({ status: "true", message: "Installment Paid Successfully" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "false", message: "Internal Server Error" });
  }
};

module.exports = { create, getloans, getrequests, approve, getloanid, payment };
