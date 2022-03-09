const User = require("../models/user");

module.exports = async (type, value) => {
  try {
    if (type === "email") return await User.findOne({ email: value });
    return await User.findOne({ _id: value });
  } catch (error) {
    throw error
  }
};
