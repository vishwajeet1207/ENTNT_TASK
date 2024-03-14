const { User } = require("../models/User");

async function adminVerify(req, res, next) {
  try {
    const { phone } = req.body;
    console.log(phone);
    const userP = await User.findOne({ phone });
    console.log(userP);
    if (userP.role === "1") {
      next();
    } else {
      res.send({
        success: false,
        message: "bad request",
      });
    }
  } catch (error) {
    console.log("error");
    res.send({
      success: false,
      message: "error",
    });
  }
}
module.exports = {
  adminVerify,
};
