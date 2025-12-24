import mongoose, { model } from "mongoose";

const fleetSchema = new mongoose.Schema(
  {
    plate_no: {
      // -> license_no
      type: String,
      required: true,
      unique: true,
    },
    max_capacity: {
      // capacity
      type: Number,
      max: 2500,
      min: 0,
    },
    depot_location: {
      // Remove completely
      type: String,
    },
    status: {
      type: String,
      enum: ["available", "unavailable", "inService"],
      default: "unavailable", // available
    },
    model: {
      type: String,
      required: true,
    },
    distance_travelled: {
      type: String,
    },
    route: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6"], // use min: 1 max: 6
    },
  },
  {
    timestamps: true,
  }
);

export const Trucks = model("Trucks", fleetSchema);

export default Trucks;
