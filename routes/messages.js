const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  sendMessage, getMessages, deleteMessage
} = require("../handlers/messages");

router
  .route("/")
  .post(sendMessage)
  .get(getMessages)

router
  .route("/:message_id")
  .delete(deleteMessage)

module.exports = router;
