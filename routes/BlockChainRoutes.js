const express = require("express");

const { chechBlockChainValid } = require("../controller/BlockChainController");
const router = express.Router();

router.get("/CheckBlockChainISValid", chechBlockChainValid);

exports.router = router;
