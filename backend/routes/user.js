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
  getProfileById,
  updateProfilePicture,
  updateCover,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unfriend,
  deleteRequest,
  getFriends,
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
router.get("/getProfileId/:id", getProfileById); //get profile by id
router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/updateCover", authUser, updateCover);
router.put("/addFriend/:id", authUser, addFriend);
router.put("/cancelRequest/:id", authUser, cancelRequest);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
router.put("/acceptRequest/:id", authUser, acceptRequest);
router.put("/unfriend/:id", authUser, unfriend);
router.put("/deleteRequest/:id", authUser, deleteRequest);
router.get("/friends/:id", getFriends);

module.exports = router;
