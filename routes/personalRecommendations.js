const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  sendPersonalRecommendation, getPersonalRecommendations
} = require("../handlers/personalRecommendations");

router
  .route("/")
  .post(sendPersonalRecommendation)
  .get(getPersonalRecommendations)

// prefix - /api/users/:id/movies/:movie_id
// router
//   .route("/:movie_id")
//   .get(getMovie)
//   .delete(deleteMovie)
//   .patch(updateMovie)

module.exports = router;
