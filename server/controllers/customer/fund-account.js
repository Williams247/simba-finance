const User = require("../../models/user");
const Transactions = require("../../models/transactions");
const { validateFundAccount } = require("../../validations/customer/fund-account");

exports.handleFundAccount = async (request, response) => {
  try {
    const {body: {amount, currency}} = request;

    const validateFundUserAccount = validateFundAccount(request.body);
    if (validateFundUserAccount.error) return response.status(400).json({ error: validateFundUserAccount.error.message })

    const fundAccount = await User.findByIdAndUpdate(request.user.id);
    if (currency === 'USD') {
      fundAccount.balanceInUSD = fundAccount.balanceInUSD + Number(amount)
    }
    if (currency === 'EUR') {
      fundAccount.balanceInEUR = fundAccount.balanceInEUR + Number(amount)
    }
    if (currency === 'NGN') {
      fundAccount.balanceInNGN = fundAccount.balanceInNGN + Number(amount)
    }

    await fundAccount.save();

    const createTransaction = new Transactions({
      userId: fundAccount._id,
      transactionType: 'credit',
      currency: currency,
      amount: amount,
      sender: "simba.co"
    })

    await createTransaction.save();

    return response.status(201).json({
      message: "Account funded successfully"
    });
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Could not create funds" })
  }
};
