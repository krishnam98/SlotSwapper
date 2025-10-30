const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const eventsController = require("../controllers/eventsController");

router.get("/getMyEvents", auth, eventsController.getMyEvents);
router.post("/create", auth, eventsController.createEvent);
router.put("/update/:id", auth, eventsController.updateEvents);
router.delete("/delete/:id", auth, eventsController.deleteEvent);

module.exports = router;
