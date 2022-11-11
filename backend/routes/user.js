const express = require("express");
const {
  register,
  activateAccount,
  login,
  sendVerification,
  findUser,
  sendResetPasswordCode,
} = require("../controllers/user");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/sendVerification", authUser, sendVerification); //for re-send email verification code
router.post("/findUser", findUser); //for finding user to change password
router.post("/sendResetPasswordCode", sendResetPasswordCode); //for sending password reset code to email

module.exports = router;
