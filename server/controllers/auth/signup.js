const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const Transactions = require("../../models/transactions");
const { validateSignUp } = require("../../validations/auth/signup");

exports.handleSignUp = async (request, response) => {
  // Gets the required requests from the client
  const { body: { username, email, password } } = request;

  // Gets all the input formats and validates them
  const validateUserSignUp = validateSignUp(request.body);
  if (validateUserSignUp.error) return response.status(400).json({ error: validateUserSignUp.error.message })
  
  // Finds a user by email
  const user = await User.findOne({ email: email });
  if (user) {
    return response.status(409).json({
      error: `This email ""${email}"" is already taken.`,
    });
  }

  try {
    // Encrypts a users password
    const userPassword = await bcrypt.hash(password, 10);
    // Creates a new user
    const createNewUser = new User({
      username: username,
      email: email,
      password: userPassword,
      balanceInUSD: 1000,
      balanceInEUR: 0,
      balanceInNGN: 0
    });

    // Saves data to the DataBase
    await createNewUser.save();

    const newUser = await User.findOne({ email: email });

    const createTransaction = new Transactions({
      userId: newUser._id,
      transactionType: 'credit',
      currency: 'USD',
      amount: 1000,
      sender: 'simba.co'
    });

    await createTransaction.save();

    response.status(201).json({ message: "Congratulations, you have been registered!" });
  } catch (error) {
    console.log(error)
    response.status(500).json({
      error: 'Could not sign up'
    })
  }
};
