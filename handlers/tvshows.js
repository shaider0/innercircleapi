const db = require("../models");

exports.createTvshow = async function(req, res, next) {
  try {
    let capitalizedTitle = req.body.title.charAt(0).toUpperCase() + req.body.title.substring(1)

    let tvshow = await db.Tvshow.create({
      title: capitalizedTitle,
      availableOn: req.body.availableOn,
      impressions: req.body.impressions,
      status: req.body.status,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.tvshows.push(tvshow.id);
    await foundUser.save();
    let foundTvshow = await db.Tvshow.findById(tvshow._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundTvshow);
  } catch (err) {
    return next(err);
  }
};

exports.getTvshows = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends
    friends.push(userId)

    let tvshows = await db.Tvshow.find({ "user": { "$in": friends } })
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(tvshows);
  } catch (err) {
    return next(err);
  }
}

exports.getTvshow = async function(req, res, next) {
  try {
    let tvshow = await db.Tvshow.findById(req.params.tvshow_id);
    return res.status(200).json(tvshow);
  } catch (err) {
    return next(err);
  }
};

exports.deleteTvshow = async function(req, res, next) {
  try {
    let foundTvshow = await db.Tvshow.findById(req.params.tvshow_id);
    await db.Tvshow.deleteOne({
      _id: req.params.tvshow_id
    })

    return res.status(200).json(foundTvshow);
  } catch (err) {
    return next(err);
  }
};

exports.updateTvshow = async function(req, res, next) {
  try {
    let foundTvshow = await db.Tvshow.findById(req.params.tvshow_id);
    let updates = req.body
    updates.title = updates.title.charAt(0).toUpperCase() + updates.title.substring(1)
    await foundTvshow.update(updates);
    let updatedTvshow = await db.Tvshow.findById(req.params.tvshow_id);
    return res.status(200).json(updatedTvshow);
  } catch (err) {
    return next(err);
  }
};
