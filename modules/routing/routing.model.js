import mongoose from "mongoose";

// Embedded Production schema inside Stop
const embeddedProductionSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    farmer_name: { type: String, required: true },
    farmer_id: { type: String, required: true },
    volume: { type: Number, required: true },
    registration_time: { type: Date, required: true },
    location: {
      lat: { type: Number, required: true },
      lang: { type: Number, required: true },
    },
    status: { type: String, enum: ["block", "pending"], required: true },
  },
  { _id: false }
); // prevent nested _id creation

// Stop schema with embedded production
const stopSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  production: { type: embeddedProductionSchema, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

// Route schema
const routeSchema = new mongoose.Schema(
  {
    vehicle_id: { type: Number, required: true },
    stops: { type: [stopSchema], required: true },
  },
  { timestamps: true }
);

export const Route = mongoose.model("Route", routeSchema);
export const Production = mongoose.model("Production", productionSchema);
