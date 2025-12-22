
import mongoose from "mongoose";

export const driverSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
  unique: true,
 },
 phone: {
  type: String,
  match: /^\d{10}$/,
  required: true,
 },
 status: {
  type: String,
  enum: ["available", "unavailable", "inService","onDuty"],
  default: "unavailable",
 },
 license_no: {
  type: String,
  required: true,
  //validation should be here
 },
});

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;