
import mongoose, { model } from 'mongoose'

const fleetSchema = new mongoose.Schema(
  {
    license_no: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      max: 2500,
      min: 0,
    },
    status: {
      type: String,
      enum: ['available', 'unavailable', 'inService'],
      default: 'available',
    },
    model: {
      type: String,
      required: true,
    },
    distance_travelled: {
      type: String,
    },
    route: {
      type: Number,
      max: 6,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
)

export const Trucks = model('Trucks', fleetSchema)

export default Trucks
