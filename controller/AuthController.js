const User = require("../models/User");
const Candidate = require("../models/Candidate");
const jwt = require("jsonwebtoken");
// For password encryption
const crypto = require("crypto");
const { sanitizeUser, sendMail } = require("../service/common");

/* Format for post request from client 
{
  "name" : "ram",
  "username" : "ramRRDA",       // Unique username
  "email":"ram@gmailcom",       // Unique email
  "password" : "Dada2003",
  "role" : "voter",
  "ID" : "",
  "addresses" : "",
  "profileimages" : ""
}
*/
exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

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
        const user = new User({
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginVoter = async (req, res) => {
  const user = req.user; // new added
  res
    .cookie("jwtVoter", req.user.token, {
      expires: new Date(Date.now() + 3600000),
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

exports.logoutVoter = async (req, res) => {
  res
    .cookie("jwtVoter", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};

exports.resetPasswordRequest = async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username: username });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    // Also set token in username
    const resetPageLink =
      "http://localhost:5173/reset-password?token=" + token + "&email=" + email;
    const subject = "reset password for e-commerce";
    const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;

    // lets send email and a token in the mail body so we can verify that user has clicked right link

    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
      console.log("successfull");
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

exports.resetPassword = async (req, res) => {
  const { username, password, token } = req.body;

  const user = await User.findOne({
    username: username,
    resetPasswordToken: token,
  });
  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        const subject = "password successfully reset for e-commerce";
        const html = `<p>Successfully able to Reset Password</p>`;
        if (email) {
          const response = await sendMail({ to: user.email, subject, html });
          res.json(response);
        } else {
          res.sendStatus(400);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
};
