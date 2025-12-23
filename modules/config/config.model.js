import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
 deport_location: {
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
 },
 
});