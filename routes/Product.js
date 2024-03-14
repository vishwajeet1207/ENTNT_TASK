const express = require("express");
const { middleware } = require("../middleware/middleware");
const { adminVerify } = require("../middleware/adminVerify");
const formidable = require("express-formidable");
// const formidableMiddleware = require("express-formidable");

const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getPhoto,
  getFilterProduct,
  getSearchProduct,
} = require("../controllers/Product");
const productRoute = express.Router();
productRoute.post("/createProduct", formidable(), createProduct);
productRoute.get("/", getProduct);
productRoute.post("/filter", getFilterProduct);
productRoute.get("/:pid", getPhoto);
productRoute.post("/delete/:id", middleware, adminVerify, deleteProduct);
productRoute.post("/update/:id", middleware, formidable(), updateProduct);
productRoute.post("/search/:keyword", getSearchProduct);
module.exports = { productRoute };
