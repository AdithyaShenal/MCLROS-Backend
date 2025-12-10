import mongoose from "mongoose";
import { productionSchema } from "../production/production.model.js";

const stopsSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  node: { type: Number, required: true },
  production: { type: productionSchema, required: false, default: null },
  load_after_visit: { type: Number, required: true },
});

const routeSchema = new mongoose.Schema({
  vehicle_id: { type: Number, required: true },
  license_no: { type: String, required: true },
  stops: { type: [stopsSchema], required: true },
  distance: { type: Number, required: true, min: 0 },
  load: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["dispatched", "completed", "canceled", "inProgress"],
    default: "dispatched",
  },
  active: { type: Boolean, default: false },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Route = mongoose.model("Route", routeSchema);

export default Route;
