const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Movie = require("./movie");
module.exports.Tvshow = require("./tvshow");
module.exports.FriendRequest = require("./friendRequest");
