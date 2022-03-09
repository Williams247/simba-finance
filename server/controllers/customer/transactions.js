const Transactions = require("../../models/transactions");

exports.handleGetTransactions = async (request, response) => {
  try {
   const getTransactions = await Transactions.find({ userId: request.user.id });
   return response.status(200).json({
     message: "Successful",
     data: getTransactions.reverse()
   })
  } catch (error) {
    console.log(error)
    response.status(500).json({
      error: "Could not get transactions"
    })
  }
};
