const express = require("express");
const {
  createCandidate,
  loginCandidate,
  checkAuth,
  logoutCandidate,
} = require("../controller/CandidateAuth");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router
  .post("/signup-candidate", createCandidate)
  .post(
    "/login-candidate",
    passport.authenticate("localCandidate"),
    loginCandidate
  )
  .get("/check-candidate", passport.authenticate("jwtCandidate"), checkAuth)
  .get("/logoutCandidate", logoutCandidate);
exports.router = router;
