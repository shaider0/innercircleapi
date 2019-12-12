require("dotenv").config();
const express = require("express");
const app = express();

const AWS = require('aws-sdk')
const fs = require('fs')
const fileType = require('file-type')
const bluebird = require('bluebird')
const multiparty = require('multiparty')

const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const potentialFriends = require("./routes/potentialFriends")
const moviesRoutes = require("./routes/movies");
const tvshowsRoutes = require("./routes/tvshows");
const mealsRoutes = require("./routes/meals");
const friendRequestsRoutes = require("./routes/friendRequests");
const friendsRoutes = require("./routes/friends");
const potentialFriendsRoutes = require("./routes/potentialFriends");
const usersRoutes = require("./routes/users");
const personalRecommendationsRoutes = require("./routes/personalRecommendations")
const conversationsRoutes = require("./routes/conversations")
const imagesRoutes = require("./routes/images")

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

AWS.config.setPromisesDependency(bluebird)

const s3 = new AWS.S3()

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

app.post('/image-upload', (request, response) => {
  const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
      } catch (error) {
        return response.status(400).send(error);
      }
    });
});

app.use(
  "/api/users/:id/images",
  loginRequired,
  ensureCorrectUser,
  imagesRoutes
)

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
  // loginRequired,
  // ensureCorrectUser,
  friendsRoutes
)

// Updating User Profile Info
app.use("/api/users/:id/profile",
  loginRequired,
  ensureCorrectUser,
  usersRoutes
)

// Movies
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
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
