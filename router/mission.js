const express = require("express");
const {
  addMission,
  getAllMission,
  updateMission,
} = require("../controller/missionController");
const router = express.Router();

router.post("/add", addMission);
router.get("/allmission", getAllMission);
router.put("/update/:id", updateMission);

module.exports = router;
