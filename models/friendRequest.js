const mongoose = require("mongoose");
const User = require("./user");

const friendRequestSchema = new mongoose.Schema(
  {
    requestor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      // 1 is requested, 2 is accepted, 3 is rejected
      type: Number,
      required: true
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

friendRequestSchema.pre("remove", async function(next) {
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

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
module.exports = FriendRequest;
