const e = require("express");
const { User } = require("../models/User");
const { passwordHash, checkPassword } = require("../Utils/authUser");
const jwt = require("jsonwebtoken");
async function addUser(req, res) {
  const { firstname, lastname, phone, password, role } = req.body;
  console.log(req.body);
  if (!firstname) {
    return res.send({ success: false, message: "FirstName is required" });
  }
  if (!lastname) {
    return res.send({ success: false, message: "ListName is required" });
  }
  if (!phone) {
    return res.send({ success: false, message: "Phone is required" });
  }
  if (!password) {
    return res.send({ success: false, message: "Password is required" });
  }
  const checkUSER = await User.findOne({ phone });
  if (checkUSER) {
    return res.status(200).send({
      success: true,
      message: "User Already Registered",
    });
  }
  const passwordNEW = await passwordHash(password);

  // console.log(password + passwordNEW);
  await User.create({
    firstname,
    lastname,
    gender: "",
    email: "",
    phone,
    role,
    password: String(passwordNEW),
  });
  return res.status(200).send({
    success: true,
    message: "User Registered Successfully",
  });
}
async function testmethod(req, res, next) {
  return res.status(200).send({
    success: true,
    message: "test case success",
  });
}
async function loginUser(req, res) {
  const { phones, passwords } = req.body;
  console.log(phones, passwords);
  console.log(req);
  try {
    if (!phones) {
      return res.send({
        success: false,
        message: "Enter Phone Number",
      });
    }
    if (!passwords) {
      return res.send({
        success: false,
        message: "Enter Password",
      });
    }

    var item = await User.findOne({
      phone: phones,
    });
    if (item) {
      const check = await checkPassword(passwords, item.password);
      if (!check) {
        return res.status(200).send({
          success: false,
          message: "Wrong passwrod",
        });
      }
      const token = await jwt.sign({ _id: item._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({
        success: true,
        user: item,
        token,
        message: "Successfully Login",
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "login error",
      error: error,
    });
  }
}
async function checkAuthrization(req, res) {
  res.send({
    success: true,
  });
}
async function checkAdmin(req, res) {
  res.send({
    success: true,
    message: "success fully access",
  });
}

module.exports = {
  addUser,
  loginUser,
  checkAuthrization,
  testmethod,
  checkAdmin,
};
