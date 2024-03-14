const jwt = require("jsonwebtoken");

async function middleware(req, res, next) {
  try {
    // const { phone } = req.body;
    // console.log(phone);
    const check = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log(check);
    next();
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "bad request",
    });
  }
}
module.exports = {
  middleware,
};
