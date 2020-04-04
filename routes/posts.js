const express = require("express")
const router = express.Router({ mergeParams: true })

const { createPost, getPosts, deletePost, updatePost } = require("../handlers/posts")


router
  .route("/")
  .post(createPost)
  .get(getPosts)

router
  .route("/:post_id")
  .delete(deletePost)
  .patch(updatePost)

  module.exports = router
