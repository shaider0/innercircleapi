const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createTvshow,
  getTvshow,
  deleteTvshow,
  updateTvshow,
  getTvshows
} = require("../handlers/tvshows");

// prefix - /api/users/:id/tvshows
router
  .route("/")
  .post(createTvshow)
  .get(getTvshows)

// prefix - /api/users/:id/tvshows/:tvshow_id
router
  .route("/:tvshow_id")
  .get(getTvshow)
  .delete(deleteTvshow)
  .patch(updateTvshow)

module.exports = router;
