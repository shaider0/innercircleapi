const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createFriendRequest,
  deleteFriendRequest,
  getFriendRequests,
  updateFriendRequest
} = require("../handlers/friendRequests");

// /api/users/:id/friendRequests

router.route("/:recipientId").post(createFriendRequest);

router.route("/").get(getFriendRequests);

router
  .route("/:friendRequest_id")
    .patch(updateFriendRequest)
    .delete(deleteFriendRequest)

module.exports = router;
