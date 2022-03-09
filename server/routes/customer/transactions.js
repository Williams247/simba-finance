const router = require("express").Router();

const auth = require("../../middleware/auth");

router.get(
  "/customer/transactions",
  auth,
  require("../../controllers/customer/transactions").handleGetTransactions
);

module.exports = router;
