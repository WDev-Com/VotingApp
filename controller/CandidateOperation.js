const Candidate = require("../models/Candidate");
const jwt = require("jsonwebtoken");

exports.getCadidate = async (req, res) => {
  try {
    let CandidateID = req.params.ID;
    console.log("Line No 7: CandidateID : ", CandidateID);

    // Use findOne instead of find to get a single document
    const candidate = await Candidate.findOne(
      { _id: CandidateID },
      "name username email role CandidateID Constituency Party addresses profileimages"
    );
    if (!candidate) {
      // If EleCommission with the given ID is not found, return a 404 response
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log(candidate);
    // If EleCommission is found, send the data in the response
    res.status(200).json(candidate);
  } catch (err) {
    // If there is any error during the process, log the error and send a 500 response
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
