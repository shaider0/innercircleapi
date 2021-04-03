const mongoose = require("mongoose");
const User = require("./user");

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'meal'
    },
    restaurant: {
      type: String
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
