const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createImage
} = require("../handlers/images");

// prefix - /api/users/:id/user/profile
router
  .route("/")
  .post(createImage)

module.exports = router;
