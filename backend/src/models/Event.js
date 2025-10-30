const mongoose = require("mongoose");
const User = require("./User");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["BUSY", "SWAPPABLE", "SWAP_PENDING"],
      default: "BUSY",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
