const express = require("express");
const router = express.Router();

const BookmarkedJob = require("../models/bookmarkedJobSchema");

router.post("/candidate/bookmarks/add", async (req, res) => {
  try {
    const {
      candidateId,
      employerName,
      employerLogo,
      jobPublisher,
      jobEmploymentType,
      jobId,
      jobTitle,
      jobApplyLink,
      jobApplyIsDirect,
      jobDescription,
      jobIsRemote,
      jobCity,
      jobState,
      jobCountry,
      jobRequestedSkills,
      jobRequiredEducation,
      jobSalaryCurrency,
      jobMinSalary,
      jobMaxSalary,
      qualifications,
      responsibilities,
    } = req.body;

    const existingBookmark = await BookmarkedJob.findOne({
      candidateId,
      jobId,
    });

    if (existingBookmark) {
      return res.status(400).json({ error: "Bookmark already exists" });
    }

    const bookmark = new BookmarkedJob({
      candidateId,
      employerName,
      employerLogo,
      jobPublisher,
      jobEmploymentType,
      jobId,
      jobTitle,
      jobApplyLink,
      jobApplyIsDirect,
      jobDescription,
      jobIsRemote,
      jobCity,
      jobState,
      jobCountry,
      jobRequestedSkills,
      jobRequiredEducation,
      jobSalaryCurrency,
      jobMinSalary,
      jobMaxSalary,
      qualifications,
      responsibilities,
      isBookmarked: true,
    });

    await bookmark.save();

    res.status(201).json({ message: "Bookmark added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/candidate/bookmarks/remove", async (req, res) => {
  try {
    const { candidateId, jobId } = req.body;

    const existingBookmark = await BookmarkedJob.findOneAndDelete({
      candidateId,
      jobId,
    });

    if (!existingBookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.json({ message: "Bookmark removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;