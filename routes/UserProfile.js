const express = require("express");
const {
  getProfile,
  addAddress,
  updateProfile,
} = require("../controllers/UserProfile");
const routes = express.Router();
routes.post("/", getProfile);
routes.post("/addAddress", addAddress);
routes.post("/updateProfile", updateProfile);
module.exports = { routes };
