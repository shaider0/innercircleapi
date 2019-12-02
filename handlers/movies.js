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

// GET - /api/users/:id/movies/
exports.getMovies = async function(req, res, next) {
  try {
    let userId = req.params.id
    let user = await db.User.findById(userId)
    let friends = user.friends

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

// GET - /api/users/:id/movies/:movie_id
exports.getMovie = async function(req, res, next) {
  try {
    let movie = await db.Movie.findById(req.params.movie_id);
    return res.status(200).json(movie);
  } catch (err) {
    return next(err);
  }
};

// DELETE /api/users/:id/movies/:movie_id
exports.deleteMovie = async function(req, res, next) {
  try {
    let foundMovie = await db.Movie.findById(req.params.movie_id);
    await foundMovie.remove();

    return res.status(200).json(foundMovie);
  } catch (err) {
    return next(err);
  }
};

// UPDATE /api/users/:id/movies/:movie_id
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
