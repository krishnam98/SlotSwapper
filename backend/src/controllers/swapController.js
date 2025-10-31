const { default: mongoose } = require("mongoose");
const Event = require("../models/Event");
const SwapRequest = require("../models/SwapRequest");

exports.getSwappableSlots = async (req, res) => {
  const events = await Event.find({
    status: "SWAPPABLE",
    owner: { $ne: req.user._id },
  }).populate("owner", "name email");
  return res.json(events);
};

exports.requestSwap = async (req, res) => {
  const { mySlotID, theirSlotID } = req.body;

  if (!mySlotID || !theirSlotID) {
    return res.status(400).json({ message: "Please provide both slot ids" });
  }

  const [mySlot, theirSlot] = await Promise.all([
    Event.findById(mySlotID),
    Event.findById(theirSlotID),
  ]);

  if (!mySlot || !theirSlot) {
    return res.status(404).json({ message: "Slot not found" });
  }
  if (String(mySlot.owner) !== String(req.user._id)) {
    return res.status(401).json({ message: "You do not own your slot" });
  }
  if (mySlot.status !== "SWAPPABLE" || theirSlot.status !== "SWAPPABLE") {
    return res
      .status(400)
      .json({ message: "One of the slot is not swappable" });
  }
  if (String(theirSlot.owner) === String(req.user._id)) {
    return res.status(400).json({ message: "You cannot swap with yourself" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const swapRequest = await SwapRequest.create(
      [
        {
          mySlot: mySlotID,
          theirSlot: theirSlotID,
          fromUser: req.user._id,
          toUser: theirSlot.owner,
          status: "PENDING",
        },
      ],
      { session }
    );

    mySlot.status = "SWAP_PENDING";
    theirSlot.status = "SWAP_PENDING";

    await mySlot.save({ session });
    await theirSlot.save({ session });

    await session.commitTransaction();

    session.endSession();

    res.status(201).json(swapRequest[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

exports.respondSwap = async (req, res) => {
  const id = req.params.id;
  const { accept } = req.body;

  const swap = await SwapRequest.findOne({ _id: id }).populate(
    "mySlot theirSlot fromUser toUser"
  );
  if (!swap) {
    return res.status(404).json({ message: "Swap request not found" });
  }

  if (String(swap.toUser._id) !== String(req.user._id)) {
    return res
      .status(401)
      .json({ message: "You cannot respond to your own request" });
  }

  if (swap.status !== "PENDING") {
    return res.status(400).json({ message: "Swap request already responded" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!accept) {
      swap.status = "REJECTED";
      await swap.save({ session });

      const mySlot = await Event.findById(swap.mySlot).session(session);
      const theirSlot = await Event.findById(swap.theirSlot).session(session);

      if (mySlot) {
        mySlot.status = "SWAPPABLE";
        await mySlot.save({ session });
      }
      if (theirSlot) {
        theirSlot.status = "SWAPPABLE";
        await theirSlot.save({ session });
      }

      await session.commitTransaction();
      session.endSession();

      return res.json({ message: "Swap Request Rejected" });
    }

    const eventA = await Event.findById(swap.mySlot).session(session);
    const eventB = await Event.findById(swap.theirSlot).session(session);

    if (!eventA || !eventB) {
      return res
        .status(404)
        .json({ message: "One of the Event does not exist" });
    }

    if (eventA.status !== "SWAP_PENDING" || eventB.status !== "SWAP_PENDING") {
      return res
        .status(400)
        .json({ message: "One of Events is not in pending state" });
    }

    const ownerA = eventA.owner;
    eventA.owner = eventB.owner;
    eventB.owner = ownerA;

    eventA.status = "BUSY";
    eventB.status = "BUSY";

    await eventA.save({ session });
    await eventB.save({ session });

    swap.status = "ACCEPTED";
    await swap.save({ session });

    await session.commitTransaction();
    session.endSession();

    const updatedSwap = await SwapRequest.findById(id).populate(
      "mySlot theirSlot fromUser toUser"
    );

    return res.json({ message: "Swap Request Accepted", updatedSwap });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
