const mongoose = require("mongoose");

const bookmarkedJobSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  employerName: {
    type: String,
    required: true,
  },
  employerLogo: {
    type: String,
    required: true,
  },
  jobPublisher: {
    type: String,
    required: true,
  },
  jobEmploymentType: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobApplyLink: {
    type: String,
    required: true,
  },
  jobApplyIsDirect: {
    type: Boolean,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobIsRemote: {
    type: Boolean,
    required: true,
  },
  jobCity: {
    type: String,
    required: true,
  },
  jobState: {
    type: String,
    required: true,
  },
  jobCountry: {
    type: String,
    required: true,
  },
  jobRequestedSkills: {
    type: [String],
    required: true,
  },
  jobRequiredEducation: {
    type: {
      postgraduate_degree: Boolean,
      professional_certification: Boolean,
      high_school: Boolean,
      associates_degree: Boolean,
      bachelors_degree: Boolean,
      degree_mentioned: Boolean,
      degree_preferred: Boolean,
      professional_certification_mentioned: Boolean,
    },
    required: true,
  },
  jobSalaryCurrency: {
    type: String,
    required: true,
  },
  jobMinSalary: {
    type: Number,
    required: true,
  },
  jobMaxSalary: {
    type: Number,
    required: true,
  },
  qualifications: {
    type: [String],
    required: true,
  },
  responsibilities: {
    type: [String],
    required: true,
  },
  isBookmarked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("BookmarkedJob", bookmarkedJobSchema);