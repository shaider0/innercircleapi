const db = require("../models");

exports.createRestaurant = async function(req, res, next) {
  try {
    let capitalizedName = req.body.name.charAt(0).toUpperCase() + req.body.name.substring(1)

    let restaurant = await db.Restaurant.create({
      name: capitalizedName,
      impressions: req.body.impressions,
      imageUrl: req.body.imageUrl,
      status: req.body.status,
      user: req.params.id
    })

    let id = restaurant._id

    let foundRestaurant = await db.Restaurant.find({ _id: id })
      .populate("user", {
        username: true,
        profileImageUrl: true
      })

    return res.status(200).json(foundRestaurant);
  } catch (err) {
    return next(err);
  }
}

exports.getRestaurants = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends
    friends.push(userId)

    let restaurants = await db.Restaurant.find({ "user": { "$in": friends } })
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(restaurants);
  } catch (err) {
    return next(err);
  }
}

exports.deleteRestaurant = async function(req, res, next) {
  try {
    let foundRestaurant = await db.Restaurant.findById(req.params.restaurant_id);
    await db.Restaurant.deleteOne({
      _id: req.params.restaurant_id
    })
    return res.status(200).json(foundRestaurant);
  } catch (err) {
    return next(err);
  }
};

exports.updateRestaurant = async function(req, res, next) {
  try {
    let foundRestaurant = await db.Restaurant.findById(req.params.restaurant_id);
    let updates = req.body
    updates.name = updates.name.charAt(0).toUpperCase() + updates.name.substring(1)
    await foundRestaurant.update(updates);
    let updatedRestaurant = await db.Restaurant.findById(req.params.restaurant_id);
    return res.status(200).json(updatedRestaurant);
  } catch (err) {
    return next(err);
  }
};
