const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    nickname: { type: String, trim: true, rewuired: true, unique: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
