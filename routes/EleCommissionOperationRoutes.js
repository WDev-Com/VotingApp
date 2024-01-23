const express = require("express");
const {
  getEleCommission,
  getAllCandidate,
  updateCandidateRole,
  updateMinnerRole,
  updateElectionCommissioner,
  CreateMinnerInBlockChain,
  deleteMinner,
  CountVoteOfCandidate,
  deleteCandidate,
} = require("../controller/EleCommissonOperation");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router.get("/UpdateElectionCommissioner/:id", updateElectionCommissioner);
router.post("/GetEleCommission", getEleCommission);
router.get("/GetAllCandidate", getAllCandidate);
router.patch("/GiveRollToCandidate/:id", updateCandidateRole);
/* 
PATCH :- http://localhost:8080/EleCommisson/GiveRollToCandidate/65aa621d9e5be4bd11d29956
Body :-
{
  "role" : "candidate"
}
*/
router.patch("/GiveRollToMinner/:id", updateMinnerRole);
router.post("/CreateMinnerInBlockChain", CreateMinnerInBlockChain);
router.post("/CountVoteOfCandidate/:id", CountVoteOfCandidate);

router.delete("/RemoveMinner/:id", deleteMinner);
router.delete("/RemoveCandidate/:id", deleteCandidate);
exports.router = router;
