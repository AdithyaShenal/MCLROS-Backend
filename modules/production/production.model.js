import mongoose from "mongoose";
import { farmerSchema } from "../farmer/farmer.model.js";

const qualitySchema = new mongoose.Schema({
  fat: Number,
  lat: Number,
  density: Number,
  water_ratio: Number,
});

export const productionSchema = new mongoose.Schema(
  {
    farmer: {
      type: farmerSchema,
      required: true,
    },

    volume: {
      type: Number,
      required: true,
      min: 0,
    },

    registration_time: {
      type: Date,
      default: Date.now,
    },

    failure_reason: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: ["pending", "awaiting pickup", "collected", "failed"],
      default: "pending",
    },

    collectedVolume: {
      type: Number,
      min: 0,
    },

    blocked: {
      type: Boolean,
      default: false,
    },

    quality: qualitySchema,
  },
  { timestamps: true }
);

export const Production = mongoose.model("Production", productionSchema);

export default Production;
