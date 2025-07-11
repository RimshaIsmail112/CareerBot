const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rating: {
    type: String,
    required: true
  }
});

const ratingResultSchema = new mongoose.Schema({
  candidateEmail: {
    type: String,
    required: true,
    unique: true  // Ensure a single document per candidate
  },
  ratings: [ratingSchema]  // Array of tests
});

module.exports = mongoose.model('RatingResult', ratingResultSchema);
