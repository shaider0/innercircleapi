const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  sendPersonalRecommendation, getPersonalRecommendations, deletePersonalRecommendation
} = require("../handlers/personalRecommendations");

router
  .route("/")
  .post(sendPersonalRecommendation)
  .get(getPersonalRecommendations)

router
  .route("/:personalRecommendation_id")
  .delete(deletePersonalRecommendation)

module.exports = router;
