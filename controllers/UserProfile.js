const { User } = require("../models/User");
async function getProfile(req, res) {
  const { userID } = req.body;
  console.log(userID);
  var profile = User.findById(userID).then((item) => {
    console.log(item);

    return res.send(item);
  });
}
async function addAddress(req, res) {
  const { ADDRE, id } = req.body;
  User.findById(id).then((item) => {
    User.updateOne({ phone: item.phone }, { address: [...item.address, ADDRE] })
      .then(() => {
        res.send({
          success: true,
          message: "Address Added",
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Address Not Added",
        });
      });
  });
}
async function updateProfile(req, res) {
  const { profile, id } = req.body;
  console.log(profile);
  User.updateOne(
    { phone: profile.phone },
    {
      $set: {
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        phone: profile.phone,
        gender: profile.gender,
      },
    }
  )
    .then(() => {
      res.send({
        success: true,
        message: "Profile Updated",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Profile Not Updated",
      });
    });
}
module.exports = {
  getProfile,
  updateProfile,
  addAddress,
};
