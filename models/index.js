const mongoose = require("mongoose");
const db = require("../config/db.js")
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(db, {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Post = require("./post");
module.exports.FriendRequest = require("./friendRequest");
module.exports.PersonalRecommendation = require("./personalRecommendation");
