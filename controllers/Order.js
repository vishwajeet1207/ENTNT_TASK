const { orderModel } = require("../models/order");

async function addOrder(req, res) {
  try {
    // const temp = req.body;
    const { payment, buyer, tem, address } = req.body;

    //
    const newmode = new orderModel({
      product: tem,
      buyer,
      payment,
      address,
    });
    newmode.save();
    res.send({
      success: true,
      message: "Order Completed",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Some Error Happen",
    });
  }
}
async function getOrder(req, res) {
  try {
    const order = await orderModel
      .find({ buyer: req.params.id })
      .populate("product", "-photo")
      .populate("buyer", "firstname");
    console.log(order);
    res.send({
      success: true,
      order: order,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "something is happen",
    });
  }
}
async function getAllOrder(req, res) {
  try {
    const order = await orderModel
      .find().populate("product", "-photo")
      .populate("buyer", "firstname")
     
      console.log(order)
    res.send({
      success: true,
      order,
    });
  } catch (error) {
    res.send({
      success: false,
    });
  }
}
async function updateOrder(req, res) {
  const status = req.body.status;
  try {
    const temp = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.send({
      success: true,
    });
  } catch (error) {
    res.send({
      success: false,
    });
  }
}
module.exports = { addOrder, getOrder, getAllOrder, updateOrder };
