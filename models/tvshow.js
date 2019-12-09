// To Add To tvshow schema
// Photo (from API) or Icon
// Friends Who Also Liked

const mongoose = require("mongoose");
const User = require("./user");

const tvshowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 160
    },
    category: {
      type: String,
      default: 'tv show'
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

tvshowSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the tvshow from their tvshows list
    user.tvshows.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Tvshow = mongoose.model("Tvshow", tvshowSchema);
module.exports = Tvshow;
