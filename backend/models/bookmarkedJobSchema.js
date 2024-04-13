const mongoose = require("mongoose");

const bookmarkedJobSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bookmarkedJobs: [
    {
      job_id: {
        type: String,
        required: true,
      },
      employer_name: {
        type: String,
        required: true,
      },
      employer_logo: {
        type: String,
        required: true,
      },
      employer_website: {
        type: String,
        required: false,
      },
      employer_company_type: {
        type: String,
        required: false,
      },
      job_publisher: {
        type: String,
        required: true,
      },
      job_employment_type: {
        type: String,
        required: true,
      },
      job_title: {
        type: String,
        required: true,
      },
      job_apply_link: {
        type: String,
        required: true,
      },
      job_apply_is_direct: {
        type: Boolean,
        required: true,
      },
      apply_options: {
        type: [
          {
            publisher: String,
            apply_link: String,
            is_direct: Boolean,
          },
        ],
        required: false,
      },
      job_description: {
        type: String,
        required: true,
      },
      job_is_remote: {
        type: Boolean,
        required: true,
      },
      job_posted_at_timestamp: {
        type: Number,
        required: false,
      },
      job_posted_at_datetime_utc: {
        type: Date,
        required: false,
      },
      job_city: {
        type: String,
        required: true,
      },
      job_state: {
        type: String,
        required: true,
      },
      job_country: {
        type: String,
        required: true,
      },
      job_latitude: {
        type: Number,
        required: false,
      },
      job_longitude: {
        type: Number,
        required: false,
      },
      job_google_link: {
        type: String,
        required: false,
      },
      job_offer_expiration_datetime_utc: {
        type: Date,
        required: false,
      },
      job_offer_expiration_timestamp: {
        type: Number,
        required: false,
      },
      job_required_experience: {
        type: {
          no_experience_required: Boolean,
          required_experience_in_months: Number,
          experience_mentioned: Boolean,
          experience_preferred: Boolean,
        },
        required: false,
      },
      job_required_education: {
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
        required: false,
      },
      job_min_salary: {
        type: Number,
        required: false,
      },
      job_max_salary: {
        type: Number,
        required: false,
      },
      job_salary_currency: {
        type: String,
        required: false,
      },
      job_highlights: {
        type: {
          Qualifications: [String],
        },
        required: false,
      },
      job_posting_language: {
        type: String,
        required: false,
      },
      job_onet_soc: {
        type: String,
        required: false,
      },
      job_onet_job_zone: {
        type: String,
        required: false,
      },
      job_occupational_categories: {
        type: [String],
        required: false,
      },
      isBookmarked: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("CandidateBookmarkedJobs", bookmarkedJobSchema);