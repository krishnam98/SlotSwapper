const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const { title, startTime, endTime } = req.body;
  const event = new Event({
    title,
    startTime,
    endTime,
    owner: req.user._id,
    status: "BUSY",
  });
  await event.save();
  res.status(201).json(event);
};

exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ owner: req.user._id }).sort({
    startTime: 1,
  });
  res.json(events);
};

exports.updateEvents = async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  const event = await Event.findOne({ _id: id, owner: req.user._id });
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  Object.assign(event, payload);
  await event.save();
  res.json(event);
};

exports.deleteEvent = async (req, res) => {
  const id = req.params.id;
  const event = await Event.findOneAndDelete({ _id: id, owner: req.user._id });

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json({ message: "Event deleted" });
};
