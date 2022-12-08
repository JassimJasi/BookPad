const express = require("express");
const {
  newConv,
  getConv,
  getTwoConv,
} = require("../controllers/conversations");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

//new conv
router.post("/conversations", newConv);
//get conv of a user
router.get("/conversations/:userId", getConv);

// get conv includes two userId
router.get("/conversations/find/:firstUserId/:secondUserId", getTwoConv);

module.exports = router;
