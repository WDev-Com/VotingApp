const Candidate = require("../models/Candidate");
const jwt = require("jsonwebtoken");
// For password encryption
const crypto = require("crypto");
const { sanitizeUser, sendMail } = require("../service/common");

/* Format for post request from client 
{
  "name" : "BST",
  "username" : "BST",      
  "email":"BST@gmailcom",     
  "password" : "Dada2003",
  "CandidateID" : "",
  "Constituency":"Pali",
  "Party":"BJP",
  "VoteCount":"",
  "addresses" : "",
  "profileimages" : ""
}
*/

exports.createCandidate = async (req, res) => {
  try {
    const existingUser = await Candidate.findOne({
      username: req.body.username,
    });

    if (existingUser && (existingUser.username || existingUser.email)) {
      // Handle duplicate username or email error
      console.log("Error Code : 11001 : Duplicate Credentials Username");
      return res.status(400).json({
        error: "Duplicate Credentials Username",
      });
    }

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new Candidate({
          ...req.body,
          password: hashedPassword,
          salt,
        });

        try {
          const doc = await user.save();
          req.login(sanitizeUser(doc), (err) => {
            if (err) {
              res.status(400).json(err);
            } else {
              const token = jwt.sign(
                sanitizeUser(doc),
                process.env.JWT_SECRET_KEY
              );
              res
                .cookie("jwtVoter", token, {
                  expires: new Date(Date.now() + 36000),
                  httpOnly: true,
                })
                .status(201)
                .json({ id: doc.id, role: doc.role });
            }
          });
        } catch (saveError) {
          // Handle MongoDB duplicate key error
          if (saveError.code === 11000) {
            console.log(
              "Error Code : " +
                saveError.code +
                " : Duplicate Credentials Email"
            );
            res.status(400).json({ error: "Duplicate Credentials Email" });
          } else {
            throw saveError; // rethrow other errors
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginCandidate = async (req, res) => {
  const user = req.user; // new added
  res
    .cookie("jwtCandidate", req.user.token, {
      expires: new Date(Date.now() + 36000),
      httpOnly: true,
    })
    .status(201)
    // .json(req.user.token);
    .json({ id: user.id, role: user.role });
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

exports.logoutCandidate = async (req, res) => {
  res
    .cookie("jwtCandidate", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};
