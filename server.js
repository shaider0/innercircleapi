require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// temporary comment
app.use(cors({ origin: [process.env.CLIENT_ORIGIN, 'http://localhost:3000'] }))

const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = process.env.PORT || 8081;


// Routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const potentialFriendsRoutes = require("./routes/potentialFriends");
const friendRequestsRoutes = require("./routes/friendRequests");
const friendRequestsSentRoutes = require("./routes/friendRequestsSent");
const friendsRoutes = require("./routes/friends");
const imagesRoutes = require("./routes/images")

const likesRoutes = require("./routes/likes")
const moviesRoutes = require("./routes/movies");
const tvshowsRoutes = require("./routes/tvshows");
const restaurantsRoutes = require("./routes/restaurants")
const mealsRoutes = require("./routes/meals")
const destinationsRoutes = require("./routes/destinations")
const discoveriesRoutes = require("./routes/discoveries")

const welcomeMessageRoutes = require("./routes/welcomeMessage")

const personalRecommendationsRoutes = require("./routes/personalRecommendations")
const conversationsRoutes = require("./routes/conversations")

app.use(
  "/api/users/:id/images",
  loginRequired,
  ensureCorrectUser,
  imagesRoutes
)

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded (for Postman)
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use(
  "/api/users/:id/discoveries/",
  loginRequired,
  ensureCorrectUser,
  discoveriesRoutes
);

app.use(
  "/api/users/:id/restaurants/",
  loginRequired,
  ensureCorrectUser,
  restaurantsRoutes
);

app.use(
  "/api/users/:id/destinations/",
  loginRequired,
  ensureCorrectUser,
  destinationsRoutes
);

// Closing the Welcome Message
app.use(
  "/api/users/:id/welcomeMessage/",
  loginRequired,
  ensureCorrectUser,
  welcomeMessageRoutes
);

// Searching for Friends
app.use(
  "/api/users/:id/potentialFriends/:username",
  loginRequired,
  ensureCorrectUser,
  potentialFriendsRoutes
);

// Viewing your friend requests, accepting and rejecting friend requests
app.use(
  "/api/users/:id/friendRequests",
  loginRequired,
  ensureCorrectUser,
  friendRequestsRoutes
)
app.use(
  "/api/users/:id/friendRequestsSent",
  loginRequired,
  ensureCorrectUser,
  friendRequestsSentRoutes
)

// Personal Recommendations
app.use(
  "/api/users/:id/personalRecommendations",
  loginRequired,
  personalRecommendationsRoutes
)

// Conversations
app.use(
  "/api/users/:id/conversations",
  loginRequired,
  conversationsRoutes
)

// Viewing Friends
app.use("/api/users/:id/friends",
  loginRequired,
  ensureCorrectUser,
  friendsRoutes
)

// Updating User Profile Info
app.use("/api/users/:id/profile",
  loginRequired,
  ensureCorrectUser,
  usersRoutes
)

// Movies
app.use("/api/users/:id/movies/:movie_id/like",
  likesRoutes
)

app.use(
  "/api/users/:id/movies",
  loginRequired,
  ensureCorrectUser,
  moviesRoutes
);

// TV Shows
app.use(
  "/api/users/:id/tvshows",
  loginRequired,
  ensureCorrectUser,
  tvshowsRoutes
);

// Meals

app.use(
  "/api/users/:id/meals",
  loginRequired,
  ensureCorrectUser,
  mealsRoutes
)

// Errors
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});
