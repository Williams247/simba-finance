const router = require("express").Router();

const auth = require("../../middleware/auth");

router.post(
  "/customer/fund-account",
  auth,
  require("../../controllers/customer/fund-account").handleFundAccount
);


module.exports = router;
