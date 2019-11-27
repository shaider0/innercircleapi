const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  friends: [
    {
      type: String
    }
  ],
  sentFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendRequest"
    }
  ],
  receivedFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendRequest"
    }
  ],
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ],
  tvshows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tvshow"
    }
  ],

});

// deletes password property before sending back a user as json
userSchema.methods.toJSON = function() {
 let obj = this.toObject();
 delete obj.password;
 return obj;
}

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
