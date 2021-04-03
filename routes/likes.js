const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  likeMovie
} = require("../handlers/movies");

router.route("/").patch(likeMovie)

module.exports = router
