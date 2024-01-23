const Minner = require("../models/Minner");
const minnerValid = require("../models/Minner.json");
const jwt = require("jsonwebtoken");
// For password encryption
const crypto = require("crypto");
const { sanitizeUser, sendMail } = require("../service/common");
const Ajv = require("ajv");

const ajv = new Ajv();
const validate = ajv.compile(minnerValid);
/* Format for post request from client 
{
  "name" : "ram",
  "username" : "ramRRDA",       // Unique username
  "email":"ram@gmailcom",       // Unique email
  "password" : "Dada2003",
  "role" : "voter",
  "MinnerID" : "",
  "profileimages" : ""
}
*/

exports.createMinner = async (req, res) => {
  try {
    if (validate(req.body)) {
      let existingUser = await Minner.findOne({
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
          const user = new Minner({
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
                    expires: new Date(Date.now() + 3600000),
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
    } else {
      res.status(200).send("Resquested Body Is Not Valid");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginMinner = async (req, res) => {
  const user = req.user; // new added
  res
    .cookie("jwtMinner", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    // .json(req.user.token);
    .json({ id: user.id, role: user.role });
};

exports.checkMinner = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

exports.logoutMinner = async (req, res) => {
  res
    .cookie("jwtMinner", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};
