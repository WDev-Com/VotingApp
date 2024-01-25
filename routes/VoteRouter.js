const express = require("express");
const {
  getCheck,
  creatingVote,
  GetData,
  findAllCandidatesByConstituency,
} = require("../controller/VoteController");
const passport = require("passport");

const router = express.Router();

//  /auth is already added in base path
router.post("/CheckRoutes", getCheck);
router.post("/CreatingVote/:VoteConNo", creatingVote);
/*
http://localhost:8080/Vote/CreatingVote
*/
router.post("/GettingData", GetData);
router.get(
  "/GetAllCandidateOFConstituency/:consti",
  findAllCandidatesByConstituency
);
/*
http://localhost:8080/Vote/GetAllCandidateOFConstituency/Pali
*/
exports.router = router;
