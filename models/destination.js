const mongoose = require("mongoose");
const User = require("./user");

const destinationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      default: 'destination'
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    impressions: {
      type: String
    },
    attractions: [
      {
        type: String
      }
    ],
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

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
