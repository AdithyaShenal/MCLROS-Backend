import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  route: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Farmer", farmerSchema);
