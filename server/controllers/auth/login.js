const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validateLogin } = require("../../validations/auth/login");

const User = require("../../models/user");

exports.handleLogin = async (request, response) => {
  // Gets the required requests from the client
  const { body: { email, password } } = request;

  const validateUserLogin = validateLogin(request.body);

  if (validateUserLogin.error) {
    return response.status(400).json({ error: validateUserLogin.error.message });
  }

  // Validates emails
  const user = await User.findOne({ email: email });
  if (!user) {
    return response.status(404).json({
      error: `User with this email ""${email}"" does not exist in our database, please try again!`,
    });
  }

  // Checks to see if password tallies
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return response.status(400).json({
      error: "Password incorrect!",
    });
  }

  // Users payload
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
    balanceInUSD: user.balanceInUSD,
    balanceInEur: user.balanceInEUR,
    balanceInNGN: user.balanceInNGN
  };

  try {
    // Logs in a user
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: 3600
    });

    response.status(200).json({
      token: token,
      user: payload,
      message: 'You are now loggedin',
    });
  } catch (error) {
    // Fails to login a user
    console.log(error)
    response.status(500).json({
      error: 'You are unable to login, please try again',
    });
  }
};
