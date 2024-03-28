const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const upload = multer();
const CandidateProfile = require('../models/candidateProfile');

router.post('/candidate-profile', upload.none(), async (req, res) => {
  try {
    const { fullName, email, preferredJobLocation, phone, skills, workExperiences, education, profession } = req.body;
    const profileData = {
      fullName,
      email,
      preferredJobLocation,
      phone,
      skills,
      workExperiences,
      education,
      profession // Added profession field
    };

    Object.keys(profileData).forEach(key => profileData[key] === undefined && delete profileData[key]);

    const profile = new CandidateProfile(profileData);
    await profile.save();
    res.status(201).send({ message: 'Profile saved successfully', profileData });
  } catch (error) {
    console.error("Saving error:", error);
    res.status(400).send({ message: 'Error saving profile', error: error.message });
  }
});

router.get('/candidate-profiles', async (req, res) => {
  try {
      const profiles = await CandidateProfile.find({});
      res.status(200).json(profiles);
  } catch (error) {
      console.error("Fetching error:", error);
      res.status(500).send({ message: 'Error fetching profiles', error: error.message });
  }
});

router.get('/candidate-profile/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const profile = await CandidateProfile.findById(id);
      if (!profile) {
          return res.status(404).send({ message: 'Profile not found' });
      }
      res.status(200).json(profile);
  } catch (error) {
      console.error("Fetching error:", error);
      res.status(500).send({ message: 'Error fetching profile', error: error.message });
  }
});
module.exports = router;
