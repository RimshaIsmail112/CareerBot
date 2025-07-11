const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: String,
  isProfilePublic: Boolean,
  phone: String,
  preferredJobLocation: String,
  profession: String,
  skills: [String],
  workExperiences: [
    {
      title: String,
      companyName: String,
      location: String,
      duration: String,
      description: String,
    },
  ],
  education: [
    {
      degree: String,
      universityName: String,
      location: String,
      duration: String,
      description: String,
    },
  ],
  profilePictureUrl: String,
  resumeUrl: String,
  bookmarked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("CandidateProfile", candidateProfileSchema);