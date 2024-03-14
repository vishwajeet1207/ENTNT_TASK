const express = require("express");
const {
  addOrder,
  getOrder,
  getAllOrder,
  updateOrder,
} = require("../controllers/Order");
const orderRoute = express.Router();

orderRoute.post("/", addOrder);
orderRoute.get("/:id", getOrder);
orderRoute.get("/", getAllOrder);
orderRoute.post("/update/:id", updateOrder);
module.exports = { orderRoute };
