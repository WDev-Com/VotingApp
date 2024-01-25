const express = require("express");
require("dotenv").config();

const cors = require("cors");
const database = require("./Database/connection");

const server = express();
// Passport Import & Express Session
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/Voter");
const Candidate = require("./models/Candidate");
const EleCommission = require("./models/ElectionCommisson");
const Minner = require("./models/Minner");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const {
  isAuth,
  isAuthGovt,
  isAuthMinner,
  isAuthEleCommission,
  checkRole,
  sanitizeUser,
  cookieExtractor,
} = require("./service/common");
const path = require("path");

const authrouter = require("./routes/VoteRouterAuth");
const voterouter = require("./routes/VoteRouter");
const candidaterouter = require("./routes/CandidateRoute");
const CandidateOperationRoutes = require("./routes/CandidateOperationRoutes");
const MinnerAuthRoutes = require("./routes/MinnerRoute");
const MinnerOperationRoutes = require("./routes/MinnerOperationRoutes");
const EleCommissonAuthRoutes = require("./routes/EleCommissionRoute");
const EleCommissonOperationRoutes = require("./routes/EleCommissionOperationRoutes");
const BlockChainRoutes = require("./routes/BlockChainRoutes");

// JWT Option
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;
// console.log(process.env.SECRET_KEY);
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.End_Point_Secret_key;

//middleware
server.use(express.json()); // to parse req.body
server.use(
  session({
    secret: process.env.Session_Secret_Key,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(cookieParser());
server.use(passport.authenticate("session"));

server.use(cors());

server.use("/VoteChain", BlockChainRoutes.router);
server.use("/Auth", authrouter.router);
server.use("/Vote", voterouter.router);
//isAuth(), checkRole("voter"),
server.use("/MemberGovtAuth", candidaterouter.router);
server.use(
  "/MemberGovtOperation",

  CandidateOperationRoutes.router
);
/* 
 isAuthGovt(),
  checkRole("candidate"),
*/
server.use("/EleCommissonAuth", EleCommissonAuthRoutes.router);
server.use(
  "/EleCommisson",

  EleCommissonOperationRoutes.router
);
/*
  isAuthEleCommission(),
  checkRole("officer"),
*/
server.use("/MinningAuth", MinnerAuthRoutes.router);
server.use(
  "/Minning",

  MinnerOperationRoutes.router
);
/*  isAuthMinner(),
  checkRole("minner"), */
// Passport Strategies
///////////////////////// For Voter
passport.use(
  "localVoter",
  new LocalStrategy(async function (username, password, done) {
    // by default passport uses username
    try {
      const user = await User.findOne({ username: username });
      console.log("Line No 112 index.js ", username, password, { user });
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);
          done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwtVoter",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("Voter : ", { jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
///////////////////////// For Candidate
passport.use(
  "localCandidate",
  new LocalStrategy(async function (username, password, done) {
    // by default passport uses username
    try {
      const user = await Candidate.findOne({ username: username });
      console.log("Line No 112 index.js ", username, password, { user });
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);
          done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwtCandidate",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(" Candidate :", { jwt_payload });
    try {
      const user = await Candidate.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

///////////////////////// For Election Commission
passport.use(
  "localEleCommission",
  new LocalStrategy(async function (username, password, done) {
    // by default passport uses username
    try {
      const user = await EleCommission.findOne({ username: username });
      console.log("Line No 112 index.js ", username, password, { user });
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);
          done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwtEleCommission",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(" EleCommission :", { jwt_payload });
    try {
      const user = await EleCommission.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

///////////////////////// For Minner
passport.use(
  "localMinner",
  new LocalStrategy(async function (username, password, done) {
    // by default passport uses username
    try {
      const user = await Minner.findOne({ username: username });
      console.log("Line No 112 index.js ", username, password, { user });
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);
          done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwtMinner",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(" Minner :", { jwt_payload });
    try {
      const user = await Minner.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    // return cb(null, user); // 3-10-2023
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    // return cb(null, { id: user.id, role: user.role }); // 3-10-2023
    return cb(null, user);
  });
});

server.listen(process.env.PORT, () => {
  console.log("server started on port 8080");
});
