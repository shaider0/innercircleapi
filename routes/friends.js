const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  deleteFriend,
  getFriends
} = require("../handlers/friends");

router.route("/").get(getFriends);

router.route("/:friendId").delete(deleteFriend)

module.exports = router;
