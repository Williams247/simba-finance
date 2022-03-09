const bcrypt = require("bcryptjs");
const { validateUser } = require("../../validations/customer/profile");
const findUser = require("../../service/find-user");
const User = require("../../models/user");

exports.handleGetProfile = async (request, response) => {
  try {
    const user = await findUser("id", request.user.id);
    return response.status(200).json({
      email: user.email,
      username: user.username
    })
  } catch (error) {
    response.status(500).json({ error: 'Could not get profile' })
  }
};

exports.handleEditProfile = async (request, response) => {
  try {
    const {body: { email, password, username }} = request;

    const validateUserProfile = validateUser(request.body);
    if (validateUserProfile.error) return response.status(400).json({ error: validateUserProfile.error.message })
    
    const setPassword = await bcrypt.hash(password, 10);
    const updateUser = await User.findOneAndUpdate(request.user.id);
    updateUser.email = email;
    updateUser.password = setPassword;
    updateUser.username = username;
    await updateUser.save();
    return response.status(200).json({ message: "Profile updated." })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Could not modify user profile." })
  }
};
