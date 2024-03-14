const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
});
const categoryModel = mongoose.model("category", CategorySchema);
module.exports = { categoryModel };
