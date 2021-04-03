const db = require("../models");

exports.createMovie = async function(req, res, next) {
  try {
    let capitalizedTitle = req.body.title.charAt(0).toUpperCase() + req.body.title.substring(1)
    let movie = await db.Movie.create({
      title: capitalizedTitle,
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
      })
      .populate("likedBy", {
        username: true
      })
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
    let updates = req.body
    updates.title = updates.title.charAt(0).toUpperCase() + updates.title.substring(1)
    await foundMovie.update(updates);
    let updatedMovie = await db.Movie.findById(req.params.movie_id);
    console.log('updated movie is', updatedMovie)
    return res.status(200).json(updatedMovie);
  } catch (err) {
    return next(err);
  }
};

exports.likeMovie = async function(req, res, next){
  try {
    let foundMovie = await db.Movie.findById(req.params.movie_id);
    console.log('found Movie is', foundMovie)

    if (!foundMovie.likedBy.includes(req.params.id)) {
      foundMovie.likedBy.push(req.params.id)
      await foundMovie.save()
    }
    else {
      await db.Movie.updateOne({
      _id: req.params.movie_id
      }, {
        $pull: {likedBy: req.params.id}
      })
    }
    let updatedMovie = await db.Movie.findById(req.params.movie_id)
    .populate("likedBy", {
      username: true
    })
    .populate("user", {
      username: true,
      profileImageUrl: true
    })
    console.log('updated movie is', updatedMovie)
    return res.status(200).json(updatedMovie);
  } catch (err) {
    return next(err);
  }
};
