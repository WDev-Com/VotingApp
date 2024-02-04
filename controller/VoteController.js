const voteSchema = require("../models/Vote.json");
const Candidate = require("../models/Candidate");
const VoteConfirmNo = require("../models/VoteConfirmNo");
const Voter = require("../models/Voter");
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

exports.creatingVote = async (req, res, next) => {
  try {
    let { voterID } = req.body;
    let { VoteConNo } = req.params;
    console.log("Line 37 voterID : ", voterID);
    console.log("Line 38 VoteConNo : ", VoteConNo);
    let findVoter;
    if (voterID) {
      findVoter = await Voter.findOne({
        VoterID: voterID,
      });
    }
    console.log("Line 45 findVoter : ", findVoter);
    let voterConfirm;
    if (findVoter !== null) {
      voterConfirm = await VoteConfirmNo.findOne({
        VoterID: voterID,
      });
      if (voterConfirm && voterConfirm.VoterConfirmNo == VoteConNo) {
        if (validate(req.body)) {
          fetch("http://localhost:5000/createVote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          })
            .then((response) => {
              console.log("Server response status:", response.status);
              return response.text();
            })
            .then((data) => {
              console.log("Server response data:", data);
              res.send(data);
            })

            .catch((error) => {
              console.log(
                "VoterController.js Line No 69 : Error adding new Vote:",
                error
              );
            });
        } else {
          res.status(200).send(validate.errors);
        }
      } else {
        res.status(400).send("Voter Confirmation Failed");
      }
    } else {
      res.status(401).send("Voter Not found");
    }
  } catch (err) {
    console.log("VoteController Line No 85", err);
    res.status(400).json(err);
  }
};

exports.getVoterByID = async (req, res) => {
  try {
    let VoterID = req.params.ID;
    console.log("Line No 7: VoterID : ", VoterID);

    // Use findOne instead of find to get a single document
    const voter = await Voter.findOne(
      { _id: VoterID },
      "name username email role authority VoterID Constituency addresses profileimages"
    );
    if (!voter) {
      // If EleCommission with the given ID is not found, return a 404 response
      return res.status(404).json({ error: "voter not found" });
    }
    console.log(voter);
    // If EleCommission is found, send the data in the response
    res.status(200).json(voter);
  } catch (err) {
    // If there is any error during the process, log the error and send a 500 response
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
