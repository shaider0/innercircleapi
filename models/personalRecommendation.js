const mongoose = require("mongoose");
const User = require("./user");
const Movie = require("./movie")
const Tvshow = require("./tvshow")
const Meal = require("./meal")
const Restaurant = require("./restaurant")
const Destination = require("./destination")
const Discovery = require("./discovery")

const personalRecommendationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'model',
      required: true
    },
    category: {
      type: String,
      required: true
    },
    customMessage: {
      type: String
    },
    model: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

personalRecommendationSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the movie from their movies list
    user.friendRequests.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const PersonalRecommendation = mongoose.model("PersonalRecommendation", personalRecommendationSchema);
module.exports = PersonalRecommendation;
