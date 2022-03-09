const router = require("express").Router();

const auth = require("../../middleware/auth");

router.post(
  "/customer/find-customer",
  auth,
  require("../../controllers/customer/find-customer").handleFindCustomer
);

module.exports = router;
