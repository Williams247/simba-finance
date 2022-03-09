const router = require("express").Router();

router.post(
  "/auth/signup",
  require("../../controllers/auth/signup").handleSignUp
);
router.post("/auth/login", require("../../controllers/auth/login").handleLogin);

module.exports = router;
