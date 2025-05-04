const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
  size: {
    type: Number,
    required: true,
  },
  candidateId: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: false,
  },
  protectedUrl: {
    type: String,
    required: true,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;