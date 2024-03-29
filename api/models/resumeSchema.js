const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
  size: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  protectedUrl: {
    type: String,
    required: true,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;