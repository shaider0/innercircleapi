// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uri = require("../config/db.js")
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(uri, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch((e) => console.log("whoops:", e))

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("connected"))
//   .catch(() => console.log("whoops"))

module.exports.User = require("./user");
module.exports.Movie = require("./movie");
module.exports.Meal = require("./meal");
module.exports.Restaurant = require("./restaurant");
module.exports.Destination = require("./destination");
module.exports.Discovery = require("./discovery");
module.exports.Tvshow = require("./tvshow");
module.exports.FriendRequest = require("./friendRequest");
module.exports.PersonalRecommendation = require("./personalRecommendation");
