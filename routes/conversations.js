const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createConversation,
} = require("../handlers/conversations");

router.route("/").post(createConversation);

module.exports = router;
