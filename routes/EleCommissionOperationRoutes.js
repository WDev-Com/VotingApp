const express = require("express");
const {
  getEleCommission,
  updateElectionCommissioner,

  getAllCandidate,
  updateCandidateRole,
  CountVoteOfCandidate,
  deleteCandidate,

  getAllMinner,
  updateMinnerRole,
  CreateMinnerInBlockChain,
  deleteMinner,

  getAllVoter,
  updateVoterRole,
  genrateVoterConfirmationNo,
  deleteVoter,
} = require("../controller/EleCommissonOperation");

const router = express.Router();
//  /auth is already added in base path
router.get("/UpdateElectionCommissioner/:id", updateElectionCommissioner);
router.post("/GetEleCommission", getEleCommission);
router.get("/GetAllCandidate", getAllCandidate);
/* 
http://localhost:8080/EleCommisson/getAllCandidate?page=2&pageSize=2&constituency=Pali&role=candidate&party=BJP
*/
router.get("/GetAllMinner", getAllMinner);
/* 
http://localhost:8080/EleCommisson/getAllMinner?page=1&pageSize=10&role=minner
*/
router.get("/GetAllVoter", getAllVoter);
/*
/getAllVoter?constituency=YourConstituency&role=user&_page=1&_limit=10
http://localhost:8080/EleCommisson/GetAllVoter?constituency=Lanja&_limit=5&_page=2
http://localhost:8080/EleCommisson/GetAllVoter?constituency=Lanja&role=voter&_limit=5&_page=1
*/
router.patch("/UpdateVoterRole/:id", updateVoterRole);
/*
PATCH :- http://localhost:8080/EleCommisson/UpdateVoterRole/65b2686b516dad3402da9447
*/
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

router.post("/GenrateVoterConfirmationNo/:voterId", genrateVoterConfirmationNo);

router.delete("/RemoveMinner/:id", deleteMinner);
router.delete("/RemoveCandidate/:id", deleteCandidate);
router.delete("/RemoveVoter/:id", deleteVoter);
exports.router = router;
