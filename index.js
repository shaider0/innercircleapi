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
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

// Friend Requests

// Searching for Friends
app.use(
  "/api/users/:id/potentialFriends/:username",
  loginRequired,
  potentialFriendsRoutes
);

// Submitting & Deleting Friend Requests
app.use(
  "/api/users/:id/friendRequests",
  loginRequired,
  friendRequestsRoutes
);

// Viewing your friend requests
// This is wrong. Your friend requests are available in your User Profile as a property

app.get("/api/users/:id/friendRequests", loginRequired, async function(req, res, next) {
  try {
    let friendRequests = await db.FriendRequest.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(friendRequests);
  } catch (err) {
    return next(err);
  }
});

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
