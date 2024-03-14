const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  count: Number,
  rating: {
    rate: Number,
    count: Number,
  },
});

const productModel = mongoose.model("Fashion", productSchema);

module.exports = {
  productModel,
  productSchema,
};
