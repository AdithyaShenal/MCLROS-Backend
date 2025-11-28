import mongoose from "mongoose";

export const farmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    route: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", farmerSchema);

export default Farmer;
