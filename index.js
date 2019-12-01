require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const potentialFriends = require("./routes/potentialFriends")
const moviesRoutes = require("./routes/movies");
const tvshowsRoutes = require("./routes/tvshows");
const friendRequestsRoutes = require("./routes/friendRequests");
const potentialFriendsRoutes = require("./routes/potentialFriends");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;

app.use(cors());

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded (for Postman)
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// Friend Requests

// Searching for Friends
app.use(
  "/api/users/:id/potentialFriends/:username",
  loginRequired,
  ensureCorrectUser,
  potentialFriendsRoutes
);

// Submitting Friend Requests
app.use(
  "/api/users/:id/friendRequests/:recipientId",
  loginRequired,
  ensureCorrectUser,
  friendRequestsRoutes
);

// Viewing your friend requests, accepting and rejecting friend requests
app.use(
  "/api/users/:id/friendRequests",
  loginRequired,
  ensureCorrectUser,
  friendRequestsRoutes
)

// Movies
app.use(
  "/api/users/:id/movies",
  loginRequired,
  ensureCorrectUser,
  moviesRoutes
);

app.get("/api/movies", loginRequired, async function(req, res, next) {
  try {
    let movies = await db.Movie.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

// TV Shows
app.use(
  "/api/users/:id/tvshows",
  loginRequired,
  ensureCorrectUser,
  tvshowsRoutes
);

app.get("/api/tvshows", loginRequired, async function(req, res, next) {
  try {
    let tvshows = await db.Tvshow.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(tvshows);
  } catch (err) {
    return next(err);
  }
});

// Errors
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
