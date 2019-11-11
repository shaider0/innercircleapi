// To Add To movie schema
// Photo (from API) or Icon
// Friends Who Also Liked

const mongoose = require("mongoose");
const User = require("./user");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 160
    },
    availableOn: {
      type: String
    },
    impressions: {
      type: String
    },
    status: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

movieSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the movie from their movies list
    user.movies.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
