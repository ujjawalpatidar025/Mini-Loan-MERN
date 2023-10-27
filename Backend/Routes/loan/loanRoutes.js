const express = require("express");

const verifyToken = require("../../verify.js");
const {
  create,
  getloans,
  getrequests,
  approve,
  getloanid,
  payment,
} = require("../../Controllers/loan/loan.js");

const router = express.Router();

router.post("/create", verifyToken, create);
router.post("/getloans", verifyToken, getloans);
router.post("/getrequests", verifyToken, getrequests);
router.post("/approve", verifyToken, approve);
router.post("/getloanid", verifyToken, getloanid);
router.post("/payment", verifyToken, payment);

module.exports = router;
