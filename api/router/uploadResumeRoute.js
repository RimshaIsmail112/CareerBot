const express = require("express");
const Resume = require("../models/resumeSchema");
const router = express.Router();

router.post("/candidate/uploadResume", async (req, res) => {
  try {
    const {
      userId,
      size,
      contentType,
      protectedUrl,
    } = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    if (!protectedUrl) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }
    const resume = {
        size,
        userId,
        contentType,
        protectedUrl,
    }
    Object.keys(resume).forEach(key => resume[key] === undefined && delete resume[key]);

    const newResume = new Resume(resume);

    await newResume.save();
    return res.json({ message: "Resume Uploaded Successfully"});
  } catch (error) {
    console.error("Error Uploading Resume:", error);
    res.status(500).json({ error: "Resume Upload Failed" });
  }
});

module.exports = router;