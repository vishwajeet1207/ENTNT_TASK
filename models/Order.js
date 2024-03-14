const mongosse = require("mongoose");

const orderScheme = new mongosse.Schema(
  {
    count: {
      type: Number,

      default: 1,
    },
    address: {
      type: Object,
    },
    product: [
      {
        type: mongosse.ObjectId,
        ref: "product",
      },
    ],
    status: {
      type: String,
      default: "Not Processing",
      enum: ["Not Processing", "Processing", "Shipped", "Deliverd", "Cancel"],
    },
    payment: {
      type: String,
    },
    buyer: {
      type: mongosse.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
const orderModel = mongosse.model("orders", orderScheme);
module.exports = { orderModel };
