const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  sendMessage, getMessages
} = require("../handlers/messages");

// prefix - /api/users/:id/movies
router
  .route("/")
  .post(sendMessage)
  .get(getMessages)

// prefix - /api/users/:id/movies/:movie_id
// router
//   .route("/:movie_id")
//   .get(getMovie)
//   .delete(deleteMovie)
//   .patch(updateMovie)

module.exports = router;
