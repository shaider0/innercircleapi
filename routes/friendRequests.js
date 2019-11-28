const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createFriendRequest,
  deleteFriendRequest,
  getFriendRequests
} = require("../handlers/friendRequests");

router.route("/").post(createFriendRequest);
router.route("/").get(getFriendRequests);

router
  .route("/:friendRequest_id")
  .delete(deleteFriendRequest)

module.exports = router;
