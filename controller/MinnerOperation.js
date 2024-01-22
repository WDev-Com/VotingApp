const Minner = require("../models/Minner");
const jwt = require("jsonwebtoken");

exports.getMinner = async (req, res) => {
  try {
    res.status(200).send("Hello World Minner!");
  } catch (err) {
    res.status(400).json(err);
  }
};
