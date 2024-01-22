const passport = require("passport");

exports.isAuth = (req, res, done) => {
  // Authenticating Routes Using jwt Statergy
  return passport.authenticate("jwtVoter");
};

exports.isAuthGovt = (req, res, done) => {
  // Authenticating Routes Using jwt Statergy
  return passport.authenticate("jwtCandidate");
};

exports.isAuthEleCommission = (req, res, done) => {
  // Authenticating Routes Using jwt Statergy
  return passport.authenticate("jwtEleCommission");
};

exports.isAuthMinner = (req, res, done) => {
  // Authenticating Routes Using jwt Statergy
  return passport.authenticate("jwtMinner");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies && req.cookies["jwtVoter"]) {
    token = req.cookies["jwtVoter"];
  } else if (req && req.cookies && req.cookies["jwtCandidate"]) {
    token = req.cookies["jwtCandidate"];
  } else if (req && req.cookies && req.cookies["jwtEleCommission"]) {
    token = req.cookies["jwtEleCommission"];
  } else if (req && req.cookies && req.cookies["jwtMinner"]) {
    token = req.cookies["jwtMinner"];
  } else {
    token = null;
  }
  return token;
};

exports.checkRole = (role) => {
  return (req, res, next) => {
    const user = req.user;
    console.log(`Common.js Line No 6 Checking ${user.role}`);
    if (user.role === role) {
      next(); // User has the required role, proceed to the next middleware or route handler
    } else {
      res.send("This Role Is Restricted"); // User doesn't have the required role, send Forbidden status
    }
  };
};
