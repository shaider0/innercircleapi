const express = require("express")
const router = express.Router({ mergeParams: true })

const { createMeal, getMeals, deleteMeal, updateMeal } = require("../handlers/meals")


router
  .route("/")
  .post(createMeal)
  .get(getMeals)

router
  .route("/:meal_id")
  .delete(deleteMeal)
  .patch(updateMeal)

  module.exports = router
