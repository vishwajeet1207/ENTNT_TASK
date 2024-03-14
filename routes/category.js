const express = require("express");
const catRouter = express.Router();
const mongoose = require("mongoose");
const { productSchema } = require("../models/Fashion");
const {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/Category");
const { middleware } = require("../middleware/middleware");
const { adminVerify } = require("../middleware/adminVerify");
catRouter.post("/get", getCategory);
catRouter.post("/", middleware, adminVerify, addCategory);
catRouter.post("/update/:id", middleware, adminVerify, updateCategory);
catRouter.post("/delete", middleware, adminVerify, deleteCategory);

module.exports = {
  catRouter,
};
