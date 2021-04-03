const express = require("express")
const router = express.Router({ mergeParams: true })

const { createRestaurant, getRestaurants, deleteRestaurant, updateRestaurant } = require("../handlers/restaurants")


router
  .route("/")
  .post(createRestaurant)
  .get(getRestaurants)

router
  .route("/:restaurant_id")
  .delete(deleteRestaurant)
  .patch(updateRestaurant)

  module.exports = router
