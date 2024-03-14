const mongoose = require("mongoose");

const creatUsers = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String },
    email: { type: String },
    role: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: Array },
  },
  {
    timestamps: true,
  }
);
var User = new mongoose.model("user", creatUsers);
module.exports = {
  User,
};
