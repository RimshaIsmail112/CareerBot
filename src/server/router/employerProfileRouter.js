const express = require('express');
const router = express.Router();
const EmployerProfile = require('../models/EmployerProfile');

router.post('/employer-profile', async (req, res) => {
    try {
        const profile = new EmployerProfile(req.body);
        await profile.save();
        res.status(201).send({ message: 'Profile created successfully', profile });
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(400).send({ message: 'Error creating profile', error: error.message });
    }
});

module.exports = router;
