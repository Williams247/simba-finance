const router = require("express").Router();

const auth = require("../../middleware/auth");

router.post(
  "/customer/send-money",
  auth,
  require("../../controllers/customer/send-money").handleSendMoney
);

module.exports = router;
