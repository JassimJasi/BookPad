const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      //to uplaod to cloudinary
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.listImages = async (req, res) => {
  const { path, sort, max } = req.body;

  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.error.message);
    });
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      //uplading function
      file.tempFilePath,
      {
        folder: path, //to mention the folder path in cloudinary
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url, //secure_url is the uploaded url in the cloud which is give as response when we upload an image to cloud
        });
      }
    );
  });
};

//function to remove file path from tmp folder if anything is wrong
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
