const db = require("../models");

exports.createDestination = async function(req, res, next) {
  try {
    let destination = await db.Destination.create({
      city: req.body.city.charAt(0).toUpperCase() + req.body.city.substring(1),
      state: req.body.state.charAt(0).toUpperCase() + req.body.state.substring(1),
      country: req.body.country.charAt(0).toUpperCase() + req.body.country.substring(1),
      impressions: req.body.impressions,
      imageUrl: req.body.imageUrl,
      status: req.body.status,
      user: req.params.id
    })

    let id = destination._id

    let foundDestination = await db.Destination.find({ _id: id })
      .populate("user", {
        username: true,
        profileImageUrl: true
      })

    return res.status(200).json(foundDestination);
  } catch (err) {
    return next(err);
  }
}

exports.getDestinations = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends
    friends.push(userId)

    let destinations = await db.Destination.find({ "user": { "$in": friends } })
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(destinations);
  } catch (err) {
    return next(err);
  }
}

exports.deleteDestination = async function(req, res, next) {
  try {
    let foundDestination = await db.Destination.findById(req.params.destination_id);
    await db.Destination.deleteOne({
      _id: req.params.destination_id
    })
    return res.status(200).json(foundDestination);
  } catch (err) {
    return next(err);
  }
};

exports.updateDestination = async function(req, res, next) {
  try {
    let foundDestination = await db.Destination.findById(req.params.destination_id);
    let updates = req.body
    updates.city = req.body.city.charAt(0).toUpperCase() + req.body.city.substring(1)
    updates.state = req.body.state.charAt(0).toUpperCase() + req.body.state.substring(1)
    updates.country = req.body.country.charAt(0).toUpperCase() + req.body.country.substring(1)
    await foundDestination.update(updates);
    let updatedDestination = await db.Destination.findById(req.params.destination_id);
    return res.status(200).json(updatedDestination);
  } catch (err) {
    return next(err);
  }
};
