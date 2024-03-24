const express = require("express");
const cloudinary = require("cloudinary").v2;
const Resume = require("../models/resumeSchema");
const fileupload = require("express-fileupload");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.use(fileupload({ useTempFiles: true }));

router.post("/candidate/uploadResume", async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    if (!req.files || !req.files.resume) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    const resumeFile = req.files.resume;

    const result = await cloudinary.uploader.upload(resumeFile.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    const newResume = new Resume({
      size: resumeFile.size,
      userId: userId,
      contentType: resumeFile.mimetype,
      protectedUrl: result.secure_url,
    });

    await newResume.save();

    res.json({ resumeUrl: result.secure_url });
  } catch (error) {
    console.error("Error Uploading Resume:", error);
    res.status(500).json({ error: "Resume Upload Failed" });
  }
});

module.exports = router;