const express = require("express");
const { getMinner } = require("../controller/MinnerOperation");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router.post("/GetMinner", getMinner);

exports.router = router;
