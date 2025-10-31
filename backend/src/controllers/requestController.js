const SwapRequest = require("../models/SwapRequest");

exports.getIncomingRequests = async (req, res) => {
  try {
    const incoming = await SwapRequest.find({ toUser: req.user._id })
      .populate({
        path: "mySlot",
        select: "title startTime endtime status owner",
      })
      .populate({
        path: "theirSlot",
        select: "title startTime endtime status owner",
      })
      .populate("fromUser", "name email")
      .sort({ creaatedAt: -1 });

    res.json(incoming);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOutgoingRequests = async (req, res) => {
  try {
    const outgoing = await SwapRequest.find({ fromUser: req.user._id })
      .populate({
        path: "mySlot",
        select: "title startTime endtime status owner",
      })
      .populate({
        path: "theirSlot",
        select: "title startTime endtime status owner",
      })
      .populate("toUser", "name email")
      .sort({ createdAt: -1 });
    res.json(outgoing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
