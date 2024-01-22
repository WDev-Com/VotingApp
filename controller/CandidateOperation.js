const Candidate = require("../models/Candidate");
const jwt = require("jsonwebtoken");

exports.getCadidate = async (req, res) => {
  try {
    res.status(200).send("Hello World Cadidate!");
  } catch (err) {
    res.status(400).json(err);
  }
};
