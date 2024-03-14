const mongosse = require("mongoose");

const productScheme = new mongosse.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongosse.ObjectId,
      ref: "category",
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const productModel = mongosse.model("product", productScheme);
module.exports = { productModel };
