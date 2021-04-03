const express = require("express")
const router = express.Router({ mergeParams: true })

const { createDestination, getDestinations, deleteDestination, updateDestination } = require("../handlers/destinations")


router
  .route("/")
  .post(createDestination)
  .get(getDestinations)

router
  .route("/:destination_id")
  .delete(deleteDestination)
  .patch(updateDestination)

  module.exports = router
