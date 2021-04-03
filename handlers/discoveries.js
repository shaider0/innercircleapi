const db = require("../models");

exports.createDiscovery = async function(req, res, next) {
  try {
    let discovery = await db.Discovery.create({
      description: req.body.description.charAt(0).toUpperCase() + req.body.description.substring(1),
      imageUrl: req.body.imageUrl,
      status: req.body.status,
      user: req.params.id
    })

    let id = discovery._id

    let foundDiscovery = await db.Discovery.find({ _id: id })
      .populate("user", {
        username: true,
        profileImageUrl: true
      })

    return res.status(200).json(foundDiscovery);
  } catch (err) {
    return next(err);
  }
}

exports.getDiscoveries = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends
    friends.push(userId)

    let discoveries = await db.Discovery.find({ "user": { "$in": friends } })
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(discoveries);
  } catch (err) {
    return next(err);
  }
}

exports.deleteDiscovery = async function(req, res, next) {
  try {
    let foundDiscovery = await db.Discovery.findById(req.params.discovery_id);
    await db.Discovery.deleteOne({
      _id: req.params.discovery_id
    })
    return res.status(200).json(foundDiscovery);
  } catch (err) {
    return next(err);
  }
};

exports.updateDiscovery = async function(req, res, next) {
  try {
    let foundDiscovery = await db.Discovery.findById(req.params.discovery_id);
    let updates = req.body
    updates.description = updates.description.charAt(0).toUpperCase() + updates.description.substring(1)
    await foundDiscovery.update(req.body);
    let updatedDiscovery = await db.Discovery.findById(req.params.discovery_id);
    return res.status(200).json(updatedDiscovery);
  } catch (err) {
    return next(err);
  }
};
