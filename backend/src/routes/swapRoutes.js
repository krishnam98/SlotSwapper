const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const swapController = require("../controllers/swapController");

router.get("/swappableSlots", auth, swapController.getSwappableSlots);
router.post("/swap-request", auth, swapController.requestSwap);
router.post("/swap-response/:id", auth, swapController.respondSwap);

module.exports = router;
