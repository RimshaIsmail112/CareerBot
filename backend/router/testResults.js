const express = require("express");
const router = express.Router();
const TestResult = require("../models/testResult");
const RatingResult = require("../models/rating");
const CandidateProfile = require("../models/candidateProfile"); // Make sure this is the correct path to your model

router.post("/post-scores/:email", async (req, res) => {
    const { email } = req.params;
    const { testName, score } = req.body;

    try {
        // Check if the candidate exists in the database
        const candidateExists = await CandidateProfile.findOne({ email: email });
        if (!candidateExists) {
            return res.status(404).send({ message: "Candidate email not found, test not conducted" });
        }

        // Check if the test result document exists for the given email
        let testResult = await TestResult.findOne({ candidateEmail: email });
        if (testResult) {
            // If test result exists, add the new test to the existing tests array
            testResult.tests.push({ testName, score });
            await testResult.save();
        } else {
            // If no test result exists, create a new document
            testResult = new TestResult({
                candidateEmail: email,
                tests: [{ testName, score }]
            });
            await testResult.save();
        }

        res.status(201).send({
            message: "Test result saved successfully",
            data: testResult
        });
    } catch (error) {
        console.error("Error saving test result:", error);
        res.status(400).json({ error: error.message });
    }
});

router.post("/post-ratings/:email", async (req, res) => {
    const { email } = req.params;
    const { rating } = req.body;

    try {
        // Check if the candidate exists in the database
        const candidateExists = await CandidateProfile.findOne({ email: email });
        if (!candidateExists) {
            return res.status(404).send({ message: "Candidate email not found, rating not submitted" });
        }

        // Check if the test result document exists for the given email
        let ratingResult = await RatingResult.findOne({ candidateEmail: email });
        if (ratingResult) {
            // If test result exists, add the new test to the existing tests array
            ratingResult.ratings.push({ rating });
            await ratingResult.save();
        } else {
            // If no test result exists, create a new document
            ratingResult = new RatingResult({
                candidateEmail: email,
                ratings: [{ rating }]
            });
            await ratingResult.save();
        }

        res.status(201).send({
            message: "Rating result saved successfully",
            data: ratingResult
        });
    } catch (error) {
        console.error("Error saving rating result:", error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/get-ratings", async (req, res) => {
    try {
        const ratingResults = await RatingResult.find();
        if (!ratingResults || ratingResults.length === 0) {
            return res.status(404).send({ message: "No rating results found" });
        }
        console.log(ratingResults);
        res.status(200).json({
            message: "Rating results retrieved successfully",
            data: ratingResults
        });
    } catch (error) {
        console.error("Error fetching rating results:", error);
        res.status(500).json({ error: error.message });
    }
})

router.get("/get-scores/:email", async (req, res) => {
    try {
        const { email } = req.params;

        // Check if the candidate exists in the database
        const candidateExists = await CandidateProfile.findOne({ email: email });
        if (!candidateExists) {
            return res.status(404).send({ message: "Candidate email not found, no test scores available" });
        }

        // If the candidate exists, fetch their test results
        const testResults = await TestResult.findOne({ candidateEmail: email });
        if (!testResults || testResults.tests.length === 0) {
            return res.status(404).send({ message: "No test results found for this candidate" });
        }

        res.status(200).json({
            message: "Test results retrieved successfully",
            data: testResults
        });
    } catch (error) {
        console.error("Error fetching test scores:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
