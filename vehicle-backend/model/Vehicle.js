const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  status: { type: String, required: true, enum: ["Available", "Unavailable", "In Service"] }, 
  manufacturer: {
    name: { type: String, required: false }, 
    country: { type: String }, 
    establishedYear: { type: Number }, 
  },
  price: {
    basePrice: { type: Number, required: false}, 
    currency: { type: String, default: "USD" }, 
  },
  specifications: {
    engine: { type: String }, 
    fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid","Gasoline"] }, 
    transmission: { type: String, enum: ["Manual", "Automatic"] }, 
    seatingCapacity: { type: Number }, 
    mileage: { type: String }, 
  },
  features: [String], 
  serviceHistory: [
    {
      serviceDate: { type: Date }, 
      description: { type: String }, 
      cost: { type: Number }, 
    },
  ],
  ownerDetails: {
    name: { type: String }, 
    contact: { type: String }, 
    purchaseDate: { type: Date }, 
  },
  location: {
    city: { type: String }, 
    state: { type: String }, 
    country: { type: String }, 
  },
  updatedAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
