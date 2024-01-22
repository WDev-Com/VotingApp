const express = require("express");
const {
  createUser,
  loginVoter,
  checkAuth,
  logoutVoter,
  resetPasswordRequest,
  resetPassword,
} = require("../controller/AuthController");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router
  .post("/signup-voter", createUser)
  .post("/login-voter", passport.authenticate("localVoter"), loginVoter)
  .get("/check-voter", passport.authenticate("jwtVoter"), checkAuth)
  .post("/reset-password-request", resetPasswordRequest)
  .post("/reset-password", resetPassword)
  .get("/logoutVoter", logoutVoter);

exports.router = router;
