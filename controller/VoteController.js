const voteSchema = require("../models/Vote.json");
const Ajv = require("ajv");

const ajv = new Ajv();
const validate = ajv.compile(voteSchema);

exports.getCheck = async (req, res) => {
  try {
    res.status(200).send("Hello World");
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.creatingVote = async (req, res) => {
  try {
    if (validate(req.body)) {
      fetch("http://localhost:5000/createVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      })
        .then((response) => response.text())
        .then((data) => {
          // console.log("Raw response from server:", data);
          const jsonData = JSON.stringify(data);
          console.log("New Vote added successfully : ", jsonData);
        })
        .catch((error) => {
          throw new Error(
            "VoterController.js Line No 38 : Error adding new Vote:",
            error
          );
        });
      res.status(200).send("Vote added successfully");
    } else {
      res.status(200).send(validate.errors);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.GetData = async (req, res) => {
  try {
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
