const mongoose = require("mongoose");
const User = require("./user");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 160,
    },
    category: {
      type: String,
      default: 'movie'
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
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

movieSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.movies.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
