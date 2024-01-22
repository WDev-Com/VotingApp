const express = require("express");
const {
  getCheck,
  creatingVote,
  GetData,
} = require("../controller/VoteController");
const passport = require("passport");

const router = express.Router();

//  /auth is already added in base path
router.post("/CheckRoutes", getCheck);
router.post("/CreatingVote", creatingVote);
/*
http://localhost:8080/Vote/CreatingVote
*/
router.post("/GettingData", GetData);
exports.router = router;
