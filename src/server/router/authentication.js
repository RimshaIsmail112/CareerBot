const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const Candidate = require("../models/candidateSchema");
const Employer = require("../models/employerSchema");
require("../database/connection");

router.post(
  "/candidate/signup",
  [
    body("firstName", "Please Fill Out All the Fields Before Submitting").notEmpty(),
    body("lastName", "Please Fill Out All the Fields Before Submitting").notEmpty(),
    body("email", "Please Provide A Valid Email Address").isEmail(),
    body("password", "Password Must Be At Least 6 Characters Long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: "Please fill out all the fields before submitting" });
      }
      try {
        const candidateExists = await Candidate.findOne({ email: email });
        if (candidateExists) {
          return res.status(409).json({ error: "Candidate Already Exists" });
        }
        const candidate = new Candidate({
          firstName,
          lastName,
          email,
          password,
        });
        const candidateRegistration = await candidate.save();
        if (candidateRegistration) {
          res
            .status(201)
            .json({ message: "Candidate Registered Successfully" });
        } else {
          res.status(500).json({ error: "Candidate Registration Failed" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
);

router.post(
  "/candidate/signin",
  [
    body("email", "Please Fill Out All the Fields Before Submitting").notEmpty(),
    body("password", "Please Fill Out All the Fields Before Submitting").notEmpty(),
    body("email", "Please Provide A Valid Email Address").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: "Please Fill Out All the Fields Before Submitting" });
        }
        const candidateLogin = await Candidate.findOne({ email: email });
        if (!candidateLogin) {
          return res.status(404).json({ error: "Candidate Not Found" });
        }
        const isMatch = await bcrypt.compare(password, candidateLogin.password);
        const token = await candidateLogin.generateAuthenticationToken();
        res.cookie("jwtToken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }
        res.json({ message: "Candidate Sign In Successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
);

router.post(
  "/employer/signup",
  [
    body("firstName", "Please Fill Out All the Fields Before Submitting").notEmpty(),
    body("lastName", "Please Fill Out All the Fields Before Submitting").notEmpty(),
    body("email", "Please Provide A Valid Email Address").isEmail(),
    body("password", "Password Must Be At Least 6 Characters Long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: "All Fields Are Required" });
      }
      try {
        const employerExists = await Employer.findOne({ email: email });
        if (employerExists) {
          return res.status(409).json({ error: "Employer Already Exists" });
        }
        const employer = new Employer({
          firstName,
          lastName,
          email,
          password,
        });
        const employerRegistration = await employer.save();
        if (employerRegistration) {
          res.status(201).json({ message: "Employer Registered Successfully" });
        } else {
          res.status(500).json({ error: "Employer Registration Failed" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
);

router.post(
  "/employer/signin",
  [
    body("email", "Please Fill Out All the Fields Before Submitting").notEmpty(),
    body("password", "Please Fill Out All the Fields Before Submitting").notEmpty(),
    body("email", "Please Provide A Valid Email Address").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: "All Fields Are Required" });
        }
        const employerLogin = await Employer.findOne({ email: email });
        if (!employerLogin) {
          return res.status(404).json({ error: "Employer Not Found" });
        }
        const isMatch = await bcrypt.compare(password, employerLogin.password);
        const token = await employerLogin.generateAuthenticationToken();
        res.cookie("jwtToken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }
        res.json({ message: "Employer Sign In Successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
);

module.exports = router;