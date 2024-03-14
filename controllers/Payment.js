const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
const instance = new Razorpay({
  key_secret: "8dthOFKgyRxcfEbUrSE9LmqX",
  key_id: "rzp_test_7FHiYoxss9u3xF",
});

async function createrOrder(req, res) {
  console.log(req.body);
  const paymentD = req.body;
  const paymentInfo = {
    amount: paymentD.amount * 100,
    currency: paymentD.currency,
    receipt: paymentD.email,
  };
  instance.orders.create(paymentInfo, (err, order) => {
    if (!err) {
      res.send({
        success: true,
        message: "Successfully order",
        order_id: order.id,
        amount: paymentD.amount,
        key_id: RAZORPAY_ID_KEY,
      });
    } else {
      res.send({
        success: false,
        message: "Something is wrong",
      });
    }
  });
}
module.exports = {
  createrOrder,
};
