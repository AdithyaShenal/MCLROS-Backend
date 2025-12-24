import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: /^\d{10}$/,
  },
  status: {
    type: String, // remove inService
    enum: ["available", "unavailable", "inService", "onDuty"],
    default: "unavailable", // available
  },
  license_no: {
    type: String,
    required: true,
    //validation should be here
    unique: true,
  },
});

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
