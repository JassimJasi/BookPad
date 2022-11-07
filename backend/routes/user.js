const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
} = require("../controllers/user");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/auth", auth);

module.exports = router;
