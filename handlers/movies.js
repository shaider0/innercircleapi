const db = require("../models");

exports.createMovie = async function(req, res, next) {
  try {
    let movie = await db.Movie.create({
      title: req.body.title,
      availableOn: req.body.availableOn,
      impressions: req.body.impressions,
      status: req.body.status,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.movies.push(movie.id);
    await foundUser.save();
    let foundMovie = await db.Movie.findById(movie._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMovie);
  } catch (err) {
    return next(err);
  }
};

exports.getMovies = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends
    friends.push(userId)

    let movies = await db.Movie.find({ "user": { "$in": friends } })
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
}

exports.getMovie = async function(req, res, next) {
  try {
    let movie = await db.Movie.findById(req.params.movie_id);
    return res.status(200).json(movie);
  } catch (err) {
    return next(err);
  }
};

exports.deleteMovie = async function(req, res, next) {
  try {
    let foundMovie = await db.Movie.findById(req.params.movie_id);
    await db.Movie.deleteOne({
      _id: req.params.movie_id
    })
    return res.status(200).json(foundMovie);
  } catch (err) {
    return next(err);
  }
};

exports.updateMovie = async function(req, res, next) {
  try {
    let foundMovie = await db.Movie.findById(req.params.movie_id);
    await foundMovie.update(req.body);
    let updatedMovie = await db.Movie.findById(req.params.movie_id);
    return res.status(200).json(updatedMovie);
  } catch (err) {
    return next(err);
  }
};
