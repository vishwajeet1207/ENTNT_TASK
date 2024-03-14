const bcrypt = require("bcrypt");

const passwordHash = async (password) => {
  try {
    const saltRounds = await bcrypt.genSaltSync(10);
    const newpasswrod = await bcrypt.hash(password, saltRounds);
    return newpasswrod;
  } catch (error) {
    console.log(error);
  }
};
const checkPassword = async (password, passwrodHashUser) => {
  try {
    return await bcrypt.compare(password, passwrodHashUser);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  passwordHash,
  checkPassword,
};
