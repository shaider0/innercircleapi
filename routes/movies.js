const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createMovie,
  getMovie,
  deleteMovie
} = require("../handlers/movies");

// prefix - /api/users/:id/movies
router.route("/").post(createMovie);

// prefix - /api/users/:id/movies/:movie_id
router
  .route("/:movie_id")
  .get(getMovie)
  .delete(deleteMovie);

module.exports = router;
