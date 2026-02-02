const mongoose = require("mongoose");

const favoriteFruitsSchema = new mongoose.Schema(
  {
    fruitsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fruits",
      required: true,
      unique: true,
    },
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          trim: true,
          maxlength: 250,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("FavoriteFruits", favoriteFruitsSchema);
