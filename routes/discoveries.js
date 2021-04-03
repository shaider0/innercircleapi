const express = require("express")
const router = express.Router({ mergeParams: true })

const { createDiscovery, getDiscoveries, deleteDiscovery, updateDiscovery } = require("../handlers/discoveries")


router
  .route("/")
  .post(createDiscovery)
  .get(getDiscoveries)

router
  .route("/:discovery_id")
  .delete(deleteDiscovery)
  .patch(updateDiscovery)

  module.exports = router
