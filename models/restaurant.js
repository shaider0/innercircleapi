const mongoose = require("mongoose");
const User = require("./user");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'restaurant'
    },
    impressions: {
      type: String
    },
    imageUrl: {
      type: String
    },
    status: {
      type: String
    },
    meals: [
      {
        type: String
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

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
