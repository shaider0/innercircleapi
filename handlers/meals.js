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
    })

    let id = meal._id

    let foundMeal = await db.Meal.find({ _id: id })
      .populate("user", {
        username: true,
        profileImageUrl: true
      })

    console.log('found meal', foundMeal)

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
    await foundMeal.update(req.body);
    let updatedMeal = await db.Meal.findById(req.params.meal_id);
    return res.status(200).json(updatedMeal);
  } catch (err) {
    return next(err);
  }
};
