const express = require("express");
const { uploadImages } = require("../controllers/upload");
const { authUser } = require("../middlwares/auth");
const imageUpload = require("../middlwares/imageUpload");

const router = express.Router();

router.post("/uploadImages", authUser, imageUpload, uploadImages);

module.exports = router;
