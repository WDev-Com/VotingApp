const Minner = require("../models/Minner");
const jwt = require("jsonwebtoken");

exports.getMinner = async (req, res) => {
  try {
    res.status(200).send("Hello World Minner!");
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.voteMinning = async (req, res) => {
  try {
    let { ID } = req.params;
    console.log("ID Of Minner " + ID);

    if (ID !== undefined) {
      const response = await fetch(
        `http://localhost:5000/miningPendingVoting/${ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(
          `MinnerOper.js LineNo 31 : Error response from server: ${errorMessage}`
        );
        res.status(500).send(`Error Minning: ${errorMessage}`);
        return;
      }

      console.log("Successfully Minned : " + ID);
      res.status(200).send("Successfully Minned : " + ID);
    } else {
      res.status(404).send("Please enter a valid Minner ID : " + ID);
    }
  } catch (err) {
    console.error("Error in voteMinning:", err);
    res.status(500).json(err);
  }
};

exports.AddNewBlockToBlockChain = async (req, res) => {
  try {
    let { ID } = req.params;
    console.log("ID Of Minner " + ID);

    if (ID !== undefined) {
      const response = await fetch(
        `http://localhost:5000/generateVotingCredit/${ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(
          `MinnerOper.js LineNo 70 : Error response from server: ${errorMessage}`
        );
        res
          .status(500)
          .send(`Error Adding Block In BlockChain: ${errorMessage}`);
        return;
      }

      console.log(
        "New Adding Block In BlockChain Successfully By MinnerID : " + ID
      );
      res
        .status(200)
        .send(
          "New Adding Block In BlockChain Successfully By MinnerID : " + ID
        );
    } else {
      res.status(404).send("Please enter a valid Minner ID : " + ID);
    }
  } catch (err) {
    console.error("Error in New Adding Block:", err);
    res.status(500).json(err);
  }
};
