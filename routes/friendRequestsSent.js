const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getFriendRequestsSent,
  deleteFriendRequestSent
} = require("../handlers/friendRequestsSent");

// /api/users/:id/friendRequestsSent

router.route("/").get(getFriendRequestsSent);
router.route("/:friendRequest_id").delete(deleteFriendRequestSent)

module.exports = router;
