const db = require("../models");

exports.createMeal = async function(req, res, next) {
  try {
    let capitalizedName = req.body.name.charAt(0).toUpperCase() + req.body.name.substring(1)

    let capitalizedRestaurant = req.body.restaurant.charAt(0).toUpperCase() + req.body.restaurant.substring(1)

    let meal = await db.Meal.create({
      name: capitalizedName,
      restaurant: capitalizedRestaurant,
      impressions: req.body.impressions,
      imageUrl: req.body.imageUrl,
      status: req.body.status,
      user: req.params.id
    })

    let id = meal._id

    let foundMeal = await db.Meal.find({ _id: id })
      .populate("user", {
        username: true,
        profileImageUrl: true
      })

    return res.status(200).json(foundMeal);
  } catch (err) {
    return next(err);
  }
}

exports.getMeals = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends
    friends.push(userId)

    let meals = await db.Meal.find({ "user": { "$in": friends } })
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(meals);
  } catch (err) {
    return next(err);
  }
}

exports.deleteMeal = async function(req, res, next) {
  try {
    let foundMeal = await db.Meal.findById(req.params.meal_id);
    await db.Meal.deleteOne({
      _id: req.params.meal_id
    })
    return res.status(200).json(foundMeal);
  } catch (err) {
    return next(err);
  }
};

exports.updateMeal = async function(req, res, next) {
  try {
    let foundMeal = await db.Meal.findById(req.params.meal_id);
    let updates = req.body
    updates.name = req.body.name.charAt(0).toUpperCase() + req.body.name.substring(1)
    updates.restaurant = req.body.restaurant.charAt(0).toUpperCase() + req.body.restaurant.substring(1)
    await foundMeal.update(updates);
    let updatedMeal = await db.Meal.findById(req.params.meal_id);
    return res.status(200).json(updatedMeal);
  } catch (err) {
    return next(err);
  }
};
