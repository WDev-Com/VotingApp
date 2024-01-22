const express = require("express");
const {
  fetchUserById,
  updateUser,
  updateUser2,
} = require("../controller/UserControl");

const router = express.Router();
//  /users is already added in base path

router
  .get("/own", fetchUserById)
  .patch("/:id", updateUser)
  .patch("/pro/:id", updateUser2);

exports.router = router;
