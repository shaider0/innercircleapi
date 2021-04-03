const mongoose = require("mongoose");
const User = require("./user");

const discoverySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      default: 'discovery'
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    imageUrl: {
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

const Discovery = mongoose.model("Discovery", discoverySchema);
module.exports = Discovery;
