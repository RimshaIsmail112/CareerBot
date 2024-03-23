const mongoose = require('mongoose');

const candidateProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
    // Removed 'required: true' to allow profile creation without a userId
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"] // Assuming you want to make fullName required
  },
  email: String,
  phone: String,
  preferredJobLocation: String,
  skills: [String],
  workExperiences: [
    {
      title: String,
      companyName: String,
      location: String,
      duration: String,
      description: String
    }
  ],
  education: [
    {
      degree: String,
      universityName: String,
      location: String,
      duration: String,
      description: String
    }
  ],
  profilePicture: String
});

module.exports = mongoose.model('CandidateProfile', candidateProfileSchema);
