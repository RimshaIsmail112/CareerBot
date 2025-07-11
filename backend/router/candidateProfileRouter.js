const express = require("express");
const router = express.Router();
const CandidateProfile = require("../models/candidateProfile");

router.post("/update-candidate-profile", async (req, res) => {
  try {
    const {
      candidateId,
      fullName,
      email,
      preferredJobLocation,
      phone,
      skills,
      workExperiences,
      education,
      profession,
      profilePicture,
      resumeUrl,
      isProfilePublic,
    } = req.body;

    if (!candidateId) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    const updateData = {
      fullName,
      email,
      phone,
      preferredJobLocation,
      profession,
      skills,
      workExperiences,
      education,
      profilePictureUrl: profilePicture,
      resumeUrl,
      isProfilePublic,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedProfile = await CandidateProfile.findOneAndUpdate(
      { candidateId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found for this candidateId" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/candidate-profile", async (req, res) => {
  try {
    const {
      candidateId,
      fullName,
      email,
      preferredJobLocation,
      phone,
      skills,
      workExperiences,
      education,
      profession,
      profilePicture,
      resumeUrl,
      isProfilePublic,
    } = req.body;
    const profileData = {
      candidateId,
      fullName,
      email,
      phone,
      preferredJobLocation,
      profession,
      skills,
      workExperiences,
      education,
      profilePictureUrl: profilePicture,
      resumeUrl,
      isProfilePublic,
    };

    Object.keys(profileData).forEach(
      (key) => profileData[key] === undefined && delete profileData[key]
    );

    const profile = new CandidateProfile(profileData);
    await profile.save();
    res
      .status(201)
      .send({ message: "Profile saved successfully", profileData });
  } catch (error) {
    console.error("Saving error:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/candidate-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await CandidateProfile.findOne({ candidateId: id });
    if (!profile) {
      return res.status(404).send({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Fetching error:", error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/candidates", async (req, res) => {
  try {
    const candidates = await CandidateProfile.find({isProfilePublic: true}).sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;