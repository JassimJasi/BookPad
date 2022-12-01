const express = require("express");
const { uploadImages, listImages } = require("../controllers/upload");
const { authUser } = require("../middlwares/auth");
const imageUpload = require("../middlwares/imageUpload");

const router = express.Router();

router.post("/uploadImages", authUser, imageUpload, uploadImages);
router.post("/listImages", authUser, listImages); //get profile images

module.exports = router;
