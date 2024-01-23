const jwt = require("jsonwebtoken");

exports.chechBlockChainValid = async (req, res) => {
  const response = await fetch("http://localhost:5000/CheckBlockChainIsValid");

  if (response.ok) {
    const data = await response.json();
    res.status(200).send(data.msg);
  }
  if (!response.ok) {
    const error = await response.json();
    res.status(401).send("BlockChain Server Error : " + error.msg);
  }
};
