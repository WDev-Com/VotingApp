const express = require("express");
const {
  getCheck,
  creatingVote,
  findAllCandidatesByConstituency,
  getVoterByID,
} = require("../controller/VoteController");
const passport = require("passport");

const router = express.Router();

//  /auth is already added in base path
router.post("/CheckRoutes", getCheck);
router.post("/CreatingVote/:VoteConNo", creatingVote);
/*
http://localhost:8080/Vote/CreatingVote
*/
router.get(
  "/GetAllCandidateOFConstituency/:consti",
  findAllCandidatesByConstituency
);
/*
http://localhost:8080/Vote/GetAllCandidateOFConstituency/Pali
*/
router.post("/GetVoterByID/:ID", getVoterByID);
exports.router = router;
