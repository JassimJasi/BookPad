const express = require("express");
const { createPost, getAllPosts } = require("../controllers/post");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", getAllPosts);

module.exports = router;
