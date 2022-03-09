const findUser = require("../../service/find-user");

exports.handleGetBalances = async (request, response) => {
  try {
    const balance = await findUser("id", request.user.id);
    return response.status(200).json({
      message: "Success",
      results: {
        balanceInUSD: balance.balanceInUSD,
        balanceInEUR: balance.balanceInEUR,
        balanceInNGN: balance.balanceInNGN
      }
    })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Could not get balances" })
  }
};
