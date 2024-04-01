const express = require("express");
const router = express.Router();

const BookmarkedCandidate = require("../models/BookmarkedCandidateSchema");
const CandidateProfile = require("../models/candidateProfile");

router.post("/employer/bookmarks/add", async (req, res) => {
  try {
    const { employerId, candidateId, resumeId } = req.body;

    const existingBookmark = await BookmarkedCandidate.findOne({
      employerId,
      candidateId,
    });
    if (existingBookmark) {
      return res.status(400).json({ error: "Bookmark already exists" });
    }

    const bookmark = new BookmarkedCandidate({
      employerId,
      candidateId,
      resumeId,
    });
    await bookmark.save();

    await CandidateProfile.findOneAndUpdate(
      { candidateId },
      { bookmarked: true }
    );

    res.status(201).json({ message: "Bookmark added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/employer/bookmarks/remove", async (req, res) => {
  try {
    const { employerId, candidateId } = req.body;

    const existingBookmark = await BookmarkedCandidate.findOne({
      employerId,
      candidateId,
    });
    if (!existingBookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    await BookmarkedCandidate.deleteOne({ employerId, candidateId });

    await CandidateProfile.findOneAndUpdate(
      { candidateId },
      { bookmarked: false }
    );

    res.json({ message: "Bookmark removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;