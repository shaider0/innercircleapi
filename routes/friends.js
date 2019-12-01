const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  // deleteFriend,
  getFriends
} = require("../handlers/friends");

// router.route("/").post(createFriendRequest);
router.route("/").get(getFriends);

// router
//   .route("/:friendRequest_id")
//     .patch(updateFriendRequest)
//     .delete(deleteFriendRequest)

module.exports = router;
