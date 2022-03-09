const User = require("../../models/user");
const {
    validatePrimaryFields,
    validateCurrencyValuesOnly,
    validateSecondaryFields,
    validateAmountValuesOnly
} = require("../../validations/customer/send-money");
const Transactions = require("../../models/transactions");
const convertMoney = require("../../helpers/convert-money");

exports.handleSendMoney = async (request, response) => {
  try {
    const { body: { email, sendingCurrency, receivingCurrency, amount }} = request;

    // Primary validations
    const primaryFieldsError = validatePrimaryFields(request.body);
    if (primaryFieldsError.error) return response.status(400).json({ error: primaryFieldsError.error.message });

    // Checks to see if a user provided a valid sending currency
    const sendingCurrencyValueError = validateCurrencyValuesOnly({ currency: sendingCurrency });
    if (sendingCurrencyValueError.error) return response.status(400).json({ error: sendingCurrencyValueError.error.message });

    // Checks to see if a user provided a valid receiving currency
    const receivingCurrencyValueError = validateCurrencyValuesOnly({ currency: receivingCurrency });
    if (receivingCurrencyValueError.error) return response.status(400).json({ error: receivingCurrencyValueError.error.message });

    // Checks current user balance
    const currentUser = await User.findOne({ _id: request.user.id });
    
    const secondaryValidation = validateSecondaryFields({
      currency: sendingCurrency,
      amount: sendingCurrency === 'USD' ? currentUser.balanceInUSD : sendingCurrency === 'EUR' ? currentUser.balanceInEUR : currentUser.balanceInNGN
    });

    if (secondaryValidation.error) return response.status(400).json({ error: secondaryValidation.error.message })

    // Finds a receiver who is stored on the application's database
    const receiver = await User.findOne({ email: email });

    if (!receiver) return response.status(404).json({ error: "User not found!" });
    if (email === request.user.email) {
      return response.status(403).json({ error: "You can't transfer to yourself, fund account your instead" })
    }

    // A helper function that converts currencies equivalent
    const convertedResult = convertMoney(
      sendingCurrency,
      receivingCurrency,
      amount,
      3
    );

    const validateConvertedResults = validateAmountValuesOnly({ amount: convertedResult.amount });
    if (validateConvertedResults.error) return response.status(400).json({ error: validateConvertedResults.error.message });

    const fundReceiver = await User.findOne({ email: receiver.email });

    // Check for currency type to credit a receiver
    if (receivingCurrency === "USD") fundReceiver.balanceInUSD = fundReceiver.balanceInUSD + Number(convertedResult.amount)
    if (receivingCurrency === "EUR") fundReceiver.balanceInEUR = fundReceiver.balanceInEUR + Number(convertedResult.amount)
    if (receivingCurrency === "NGN") fundReceiver.balanceInNGN = fundReceiver.balanceInNGN + Number(convertedResult.amount)

    await fundReceiver.save();

    const fundReceiverTransaction = new Transactions({
      userId: receiver.id,
      transactionType: "credit",
      currency: receivingCurrency,
      amount: convertedResult.amount,
      sender: request.user.email,
      exchangeRate: convertedResult.exchangeRate
    });

    await fundReceiverTransaction.save();

    const debitSender = await User.findOne({ email: request.user.email });

    // Check for currency type to debit a sender
    if (sendingCurrency === "USD") debitSender.balanceInUSD = debitSender.balanceInUSD - Number(amount);
    if (sendingCurrency === "EUR") debitSender.balanceInEUR = debitSender.balanceInEUR - Number(amount);
    if (sendingCurrency === "NGN") debitSender.balanceInNGN = debitSender.balanceInNGN - Number(amount);

    await debitSender.save();

    const debitSenderTransaction = new Transactions({
      userId: request.user.id,
      transactionType: "debit",
      currency: sendingCurrency,
      amount: amount,
      receiver: email,
      exchangeRate: convertedResult.exchangeRate
    });

    await debitSenderTransaction.save();

    return response.status(200).json({ message: "Transaction successful" });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Could not send money" });
  }
};
