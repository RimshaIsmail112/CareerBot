const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const EmployerProfile = require("../models/EmployerProfile");
const fileUpload = require("express-fileupload");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.use(fileUpload({ useTempFiles: true }));

router.post("/employer-profile", async (req, res) => {
  try {
    if (!req.files || !req.files.profilePicture) {
      return res.status(400).json({ error: "No profile picture uploaded" });
    }

    const profilePicture = req.files.profilePicture;
    const result = await cloudinary.uploader.upload(profilePicture.tempFilePath);

    const {
      companyName,
      industry,
      address,
      contact,
      companyDescription,
      websiteURL,
      facebookURL,
      instagramURL,
      twitterURL,
    } = req.body;

    const profileData = {
      companyName,
      industry,
      address,
      contact,
      companyDescription,
      websiteURL,
      facebookURL,
      instagramURL,
      twitterURL,
      profilePictureUrl: result.secure_url,
    };

    const profile = new EmployerProfile(profileData);
    await profile.save();

    res.status(201).json({ message: "Profile saved successfully", profile });
  } catch (error) {
    console.error("Saving error:", error);
    res
      .status(400)
      .json({ message: "Error saving profile", error: error.message });
  }
});

module.exports = router;
