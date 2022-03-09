const findUser = require("../../service/find-user");
const { validateFindUser } = require("../../validations/customer/find-customer");

exports.handleFindCustomer = async (request, response) => {
  try {
    const email = request.body.email;
    const validateUserEmail = validateFindUser(request.body);
    if (validateUserEmail.error) return response.status(400).json({ error: validateUserEmail.error.message })
    if (email === request.user.email) {
      return response.status(403).json({ error: "You can't transfer to yourself, fund account your instead" });
    }
    const customer = await findUser("email", email);
    if (!customer) return response.status(404).json({ error: "User not found" });
    return response.status(200).json({
      message: "Success",
      data: customer
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Could not find customer" })
  }
};
