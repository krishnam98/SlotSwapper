const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const requestController = require("../controllers/requestController");

router.get("/getIncomingRequests", auth, requestController.getIncomingRequests);
router.get("/getOutgoingRequests", auth, requestController.getOutgoingRequests);

module.exports = router;
