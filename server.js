require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }))

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

const postsRoutes = require("./routes/posts")

const welcomeMessageRoutes = require("./routes/welcomeMessage")

const messagesRoutes = require("./routes/messages")

// images
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

// auth
app.use("/api/auth", authRoutes);

// posts
app.use(
  "/api/users/:id/posts/",
  loginRequired,
  ensureCorrectUser,
  postsRoutes
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

// Messages
app.use(
  "/api/users/:id/messages",
  loginRequired,
  messagesRoutes
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
