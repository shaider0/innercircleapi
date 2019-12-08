const mongoose = require("mongoose");
const User = require("./user");

const conversationSchema = new mongoose.Schema(
  {
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  {
    timestamps: true
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
