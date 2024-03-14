const express = require("express");
const userRoute = express.Router();
const { middleware } = require("../middleware/middleware");
const {
  addUser,
  loginUser,
  testmethod,
  checkAuthrization,
  checkAdmin,
} = require("../controllers/User");
const { adminVerify } = require("../middleware/adminVerify");
userRoute.post("/", addUser);
userRoute.post("/signin", loginUser);
userRoute.get("/test", middleware, testmethod);
userRoute.get("/user-auth", middleware, checkAuthrization);
userRoute.post("/admin-dashboard", middleware, adminVerify, checkAdmin);
module.exports = {
  userRoute,
};
