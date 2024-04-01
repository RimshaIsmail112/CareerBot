const mongoose = require("mongoose");

const bookmarkedCandidateSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "BookmarkedCandidate",
  bookmarkedCandidateSchema
);