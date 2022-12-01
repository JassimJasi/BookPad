const express = require("express");
const {
  register,
  activateAccount,
  login,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
} = require("../controllers/user");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/sendVerification", authUser, sendVerification); //for re-send email verification code
router.post("/findUser", findUser); //for finding user to change password
router.post("/sendResetPasswordCode", sendResetPasswordCode); //for sending password reset code to email
router.post("/validateResetCode", validateResetCode); //for validate reset code
router.post("/changePassword", changePassword); //for changeing password
router.get("/getProfile/:username", authUser, getProfile); //get profile
router.put("/updateProfilePicture", authUser, updateProfilePicture);

module.exports = router;
