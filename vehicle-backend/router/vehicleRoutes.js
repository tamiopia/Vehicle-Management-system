const express = require("express");
const {
  getVehicles,
  addVehicle,
  updateVehicle,
  getVehicleById,
  deleteVehicle,
  updateVehicleStatus
} = require("../controllers/vehicleController");

const router = express.Router();

// Route to fetch all vehicles
router.get("/", getVehicles);

// Route to add a new vehicle
router.post("/", addVehicle);

// Route to update vehicle status
router.put("/:id", updateVehicle);

router.get('/:id', getVehicleById); // Fetch vehicle by ID

router.delete('/:id', deleteVehicle); // Delete vehicle by ID

router.patch('/:id/status', updateVehicleStatus);


module.exports = router;
