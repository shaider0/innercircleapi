const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  updateUser
} = require("../handlers/users");

// prefix - /api/users/:id/user/profile
router
  .route("/")
  .patch(updateUser)

module.exports = router;
