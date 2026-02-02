const mongoose = require("mongoose");

const fruitsSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    photoBase64: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Fruits", fruitsSchema);
