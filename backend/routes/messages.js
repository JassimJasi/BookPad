const express = require("express");
const { addMessage, getMessage } = require("../controllers/messages");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

//add
router.post("/messages", addMessage);
//get
router.get("/messages/:conversationId", getMessage);

module.exports = router;
