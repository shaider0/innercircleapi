const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  patchWelcomeMessage
} = require("../handlers/welcomeMessage");

router.route("/").patch(patchWelcomeMessage);

module.exports = router;
