const express = require("express");
const {
  getMinner,
  voteMinning,
  AddNewBlockToBlockChain,
} = require("../controller/MinnerOperation");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router.post("/GetMinnerByID/:ID", getMinner);
router.post("/MineVotes/:ID", voteMinning);
router.post("/AddNewBlock/:ID", AddNewBlockToBlockChain);

exports.router = router;
