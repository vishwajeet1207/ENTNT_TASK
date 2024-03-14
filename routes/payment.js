const { createrOrder } = require("../controllers/Payment");

const express = require("express");
const paymentRoute = express.Router();

paymentRoute.post("/", createrOrder);
module.exports = { paymentRoute };
