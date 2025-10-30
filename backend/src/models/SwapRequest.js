const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema(
  {
    mySlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    theirSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["ACCEPTED", "REJECTED", "PENDING"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SwapRequest", swapRequestSchema);
