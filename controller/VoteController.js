const voteSchema = require("../models/Vote.json");
const Candidate = require("../models/Candidate");
const Ajv = require("ajv");

const ajv = new Ajv();
const validate = ajv.compile(voteSchema);

exports.getCheck = async (req, res) => {
  try {
    res.status(200).send("Hello World");
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.findAllCandidatesByConstituency = async (req, res) => {
  try {
    let consti = req.params.consti;
    console.log("consti : ", consti);
    const candidates = await Candidate.find(
      { Constituency: consti },
      "name profileimages CandidateID Constituency Party"
    );
    console.log(candidates);
    res.status(200).send(candidates);
  } catch (error) {
    console.error("Error finding candidates:", error);
  }
};

exports.creatingVote = async (req, res) => {
  try {
    if (validate(req.body)) {
      fetch("http://localhost:5000/createVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("@@@@@@@@", data);
          res.send(data);
        })
        .catch((error) => {
          throw new Error(
            "VoterController.js Line No 38 : Error adding new Vote:",
            error
          );
        });
    } else {
      res.status(200).send(validate.errors);
    }
  } catch (err) {
    console.log("VoteController Line No 56", err);
    res.status(400).json(err);
  }
};

exports.GetData = async (req, res) => {
  try {
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
