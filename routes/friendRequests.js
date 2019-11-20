const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createFriendRequest,
  deleteFriendRequest
} = require("../handlers/friendRequests");

router.route("/").post(createFriendRequest);

router
  .route("/:friendRequest_id")
  .delete(deleteFriendRequest)

module.exports = router;
