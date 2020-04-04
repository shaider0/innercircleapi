const mongoose = require("mongoose");

const User = require("./user");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    imageUrl: {
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

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
