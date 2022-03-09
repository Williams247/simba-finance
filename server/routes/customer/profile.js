const router = require("express").Router();

const auth = require("../../middleware/auth");

router.get(
  "/customer/profile",
  auth,
  require("../../controllers/customer/profile").handleGetProfile
);
router.put(
  "/customer/edit-profile",
  auth,
  require("../../controllers/customer/profile").handleEditProfile
);

module.exports = router;
