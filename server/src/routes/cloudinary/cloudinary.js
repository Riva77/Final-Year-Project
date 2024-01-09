const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/", async (req, res) => {
 
  try {
    const file = req.files.file;
    const { url } = await cloudinary.uploader.upload(file.tempFilePath);
    res.status(200).json({ url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
