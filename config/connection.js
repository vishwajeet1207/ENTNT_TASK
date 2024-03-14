const mongoose = require("mongoose");

async function connectMongodb(url) {
  return await mongoose.connect(url);
}
module.exports = { connectMongodb };
