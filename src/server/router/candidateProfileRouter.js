const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const CandidateProfile = require("../models/candidateProfile");
const fileUpload = require("express-fileupload");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.use(fileUpload({ useTempFiles: true }));

router.post("/candidate-profile", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    if (!req.files || !req.files.profilePicture) {
      return res.status(400).json({ error: "No profile picture uploaded" });
    }

    const profilePicture = req.files.profilePicture;
    const result = await cloudinary.uploader.upload(
      profilePicture.tempFilePath
    );

    const {
      fullName,
      email,
      preferredJobLocation,
      phone,
      skills,
      workExperiences,
      education,
    } = req.body;

    const profileData = {
      fullName,
      email,
      preferredJobLocation,
      phone,
      skills,
      workExperiences,
      education,
      profilePictureUrl: result.secure_url,
    };

    Object.keys(profileData).forEach(
      (key) => profileData[key] === undefined && delete profileData[key]
    );

    const profile = new CandidateProfile(profileData);
    await profile.save();

    res
      .status(201)
      .json({ message: "Profile saved successfully", profileData });
  } catch (error) {
    console.error("Saving error:", error);
    res
      .status(400)
      .json({ message: error.message });
  }
});

// router.get("/candidate-profiles", async (req, res) => {
//   try {
//     const profiles = await CandidateProfile.find({});
//     res.status(200).json(profiles);
//   } catch (error) {
//     console.error("Fetching error:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching profiles", error: error.message });
//   }
// });

router.get("/candidate-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await CandidateProfile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Fetching error:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});

module.exports = router;