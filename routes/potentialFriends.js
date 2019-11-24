const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getPotentialFriend
} = require("../handlers/potentialFriends");

router
  .route("/")
  .get(getPotentialFriend)

module.exports = router;
