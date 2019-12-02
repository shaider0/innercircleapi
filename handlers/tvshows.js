const db = require("../models");

exports.createTvshow = async function(req, res, next) {
  try {
    let tvshow = await db.Tvshow.create({
      title: req.body.title,
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

// GET - /api/users/:id/tvshows/

exports.getTvshows = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends

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

// GET - /api/users/:id/tvshows/:tvshow_id
exports.getTvshow = async function(req, res, next) {
  try {
    let tvshow = await db.Tvshow.findById(req.params.tvshow_id);
    return res.status(200).json(tvshow);
  } catch (err) {
    return next(err);
  }
};

// DELETE /api/users/:id/tvshows/:tvshow_id
exports.deleteTvshow = async function(req, res, next) {
  try {
    let foundTvshow = await db.Tvshow.findById(req.params.tvshow_id);
    await foundTvshow.remove();

    return res.status(200).json(foundTvshow);
  } catch (err) {
    return next(err);
  }
};

// UPDATE /api/users/:id/tvshows/:tvshow_id
exports.updateTvshow = async function(req, res, next) {
  try {
    let foundTvshow = await db.Tvshow.findById(req.params.tvshow_id);
    await foundTvshow.update(req.body);
    let updatedTvshow = await db.Tvshow.findById(req.params.tvshow_id);
    return res.status(200).json(updatedTvshow);
  } catch (err) {
    return next(err);
  }
};
