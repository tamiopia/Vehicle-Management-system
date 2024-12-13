const Vehicle = require("../model/Vehicle");

// Fetch all vehicles
const getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    next(error);
  }
};

// Add a new vehicle
const addVehicle = async (req, res, next) => {
  try {
    const {
      name,
      status,
      manufacturer,
      price,
      specifications,
      features,
      serviceHistory,
      ownerDetails,
      location,
    } = req.body;

    const newVehicle = new Vehicle({
      name,
      status,
      manufacturer,
      price,
      specifications,
      features,
      serviceHistory,
      ownerDetails,
      location,
    });

    await newVehicle.save();
    res.status(201).json({ message: "Vehicle added successfully", vehicle: newVehicle });
  } catch (error) {
    next(error);
  }
};




const updateVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body; 

    
    const existingVehicle = await Vehicle.findById(id);

    if (!existingVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const updatedData = { ...existingVehicle.toObject(), updatedAt: Date.now() };

    
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        updatedData[key] = updates[key]; 
      }
    }

    
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

   
    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    
    res.json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateVehicle };


// Add a new service record to a vehicle's service history
const addServiceRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { serviceDate, description, cost } = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Add new service record
    vehicle.serviceHistory.push({ serviceDate, description, cost });
    vehicle.updatedAt = Date.now();

    await vehicle.save();
    res.json({ message: "Service record added successfully", vehicle });
  } catch (error) {
    next(error);
  }
};

// Get vehicle by ID
const getVehicleById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findById(id);
  
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
  
      res.json(vehicle);
    } catch (error) {
      next(error);
    }
  };
  
  // Delete vehicle by ID
  const deleteVehicle = async (req, res, next) => {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findByIdAndDelete(id);
  
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
  
      res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  

const updateVehicleStatus = async (req, res) => {
    const { id } = req.params; 
    const { status } = req.body; 
  
    
    const validStatuses = ['Available', 'In service', 'Unavailable']; 
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided.' });
    }
  
    try {
      
      const vehicle = await Vehicle.findById(id);
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found.' });
      }
  
      
      vehicle.status = status;
      await vehicle.save();
  
      
      return res.status(200).json({
        message: 'Vehicle status updated successfully.',
        vehicle
      });
    } catch (err) {
      return res.status(500).json({
        message: 'An error occurred while updating vehicle status.',
        error: err.message
      });
    }
  };
  
  module.exports = {
    getVehicles,
    addVehicle,
    updateVehicle,
    addServiceRecord,
    getVehicleById,
    deleteVehicle,
    updateVehicleStatus
  };
  