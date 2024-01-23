const express = require("express");
const {
  createMinner,
  loginMinner,
  checkMinner,
  logoutMinner,
} = require("../controller/MinnerAuth");
const passport = require("passport");

const { isAuthEleCommission, checkRole } = require("../service/common");

const router = express.Router();
//  /auth is already added in base path

////////////////// Only Election Commissioners can create minners
//////////// This method is implemented in EleCommissionRoute.js
router
  .post("/login-minner", passport.authenticate("localMinner"), loginMinner)
  .get("/check-minner", passport.authenticate("jwtMinner"), checkMinner)
  .get("/logoutMinner", logoutMinner);
exports.router = router;
