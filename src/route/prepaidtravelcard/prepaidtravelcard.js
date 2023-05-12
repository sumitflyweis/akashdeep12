const express = require("express");
const router = express.Router();
const prepaidtravelController = require("../../controller/prepaidtravelcard/prepaidtravelcard");

router.post("/", prepaidtravelController.createPrepaidTravel);
router.get("/:id", prepaidtravelController.getPrepaidTravelById);
router.put("/:id", prepaidtravelController.updatePrepaidTravelById);
router.delete("/:id", prepaidtravelController.deletePrepaidTravelById);

module.exports = router;
