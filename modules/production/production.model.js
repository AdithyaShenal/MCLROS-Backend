import mongoose from "mongoose";
import { farmerSchema } from "../farmer/farmer.model.js";

const qualitySchema = new mongoose.Schema({
  fat: Number,
  lat: Number,
  density: Number,
  water_ratio: Number,
});

const productionSchema = new mongoose.Schema(
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

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
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
