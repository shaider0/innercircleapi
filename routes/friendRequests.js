const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createFriendRequest,
  deleteFriendRequest,
  getFriendRequests,
  updateFriendRequest
} = require("../handlers/friendRequests");

router.route("/").post(createFriendRequest);
router.route("/").get(getFriendRequests);

router
  .route("/:friendRequest_id")
    .patch(updateFriendRequest)
    .delete(deleteFriendRequest)

module.exports = router;
