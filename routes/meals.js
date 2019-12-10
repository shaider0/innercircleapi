const express = require("express")
const router = express.Router({ mergeParams: true })

const { createMeal } = require("../handlers/meals")


router
  .route("/")
  .post(createMeal)

  module.exports = router
