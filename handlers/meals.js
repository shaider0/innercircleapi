const db = require("../models");

exports.createMeal = async function(req, res, next) {
  try {
    let meal = await db.Meal.create({
      name: req.body.name,
      restaurant: req.body.restaurant,
      impressions: req.body.impressions,
      imageUrl: req.body.imageUrl,
      status: req.body.status,
      user: req.params.id
    });
    return res.status(200).json(meal);
  } catch (err) {
    return next(err);
  }
}
