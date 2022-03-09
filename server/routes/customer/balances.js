const router = require("express").Router();

const auth = require("../../middleware/auth");

router.get(
  "/customer/balances",
  auth,
  require("../../controllers/customer/balances").handleGetBalances
);

module.exports = router;
