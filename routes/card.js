const express = require("express");
const routers = express.Router();

const {
  getFromCard,
  deleteFromCard,
  addToCard,
} = require("../controllers/Cart");

routers.get("/:cardHolderName", getFromCard);
routers.delete("/:cardHolderName/:title", deleteFromCard);
routers.post("/:cardHolderName", addToCard);

module.exports = { routers };
