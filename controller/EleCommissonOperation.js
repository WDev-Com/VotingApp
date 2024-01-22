const EleCommission = require("../models/ElectionCommisson");
const Candidate = require("../models/Candidate");
const Minner = require("../models/Minner");
const jwt = require("jsonwebtoken");

exports.updateElectionCommissioner = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    username,
    email,
    password,
    role,
    OffierID,
    addresses,
    profileimages,
  } = req.body; // Extract the fields you want to update
  try {
    // console.log("id: " + id);
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;
    if (role) updatedFields.role = role;
    if (OffierID) updatedFields.OffierID = OffierID;
    if (addresses) updatedFields.addresses = addresses;
    if (profileimages) updatedFields.profileimages = profileimages;
    const user = await EleCommission.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getEleCommission = async (req, res) => {
  try {
    res.status(200).send("Hello World Election Commission!");
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getAllCandidate = async (req, res) => {
  try {
    const candidates = await Candidate.find(
      {},
      "name username email role CandidateID Constituency Party addresses"
    );
    if (candidates) {
      res.status(200).json(candidates);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getAllMinner = async (req, res) => {
  try {
    const minner = await Minner.find({}, "name username email role MinnerID");
    if (minner) {
      res.status(200).json(minner);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCandidateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body; // Extract the fields you want to update
  try {
    console.log("id: " + id);
    const updatedFields = {};
    if (role) updatedFields.role = role;
    const user = await Candidate.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateMinnerRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body; // Extract the fields you want to update
  try {
    console.log("id: " + id);
    const updatedFields = {};
    if (role) updatedFields.role = role;
    const user = await Minner.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteMinner = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Minner.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Candidate.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
