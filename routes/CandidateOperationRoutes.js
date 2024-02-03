const express = require("express");
const { getCadidate } = require("../controller/CandidateOperation");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router.post("/GetcandidateById/:ID", getCadidate);

exports.router = router;
