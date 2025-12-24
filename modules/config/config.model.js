import { min } from "lodash";
import mongoose from "mongoose";

const FIXED_TEMPLET="Your milk production of [VOLUME] liters is scheduled for pickup."

const lat_fat_tableSchema = new mongoose.Schema({
  lat: { type: [Number], required: true },
  fat: { type: [Number], required: true },
  rates: { type: [[Number]], required: true },
})


const configSchema = new mongoose.Schema({
 deport_location: {
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
 },
 notification_template: {
  templet: { type: String,
  enum: [FIXED_TEMPLET],
  required: true},
  volume: { type: Number,min: 0,
  required: true},
},
 lat_fat_table: {
  type: lat_fat_tableSchema,
  required: true,
 },


}, { timestamps: true });

 const Config = mongoose.model("Config", configSchema);
export default Config