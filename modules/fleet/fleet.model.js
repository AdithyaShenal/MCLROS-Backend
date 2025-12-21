import mangoose, { model } from 'mongoose'

export const fleetSchema = new mangoose.Schema(
  {
    plate_no: {
      type: String,
      match: /^[A-Z]{2}\s?[A-Z]{2,3}-\d{3,4}$/, //acording to schema given
      required: true,
    },
    max_capacity: {
      type: Number,
      max: 2500,
      min: 0,
      required: true,
    },
    depot_location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'unavailable', 'inService'],
      default: 'unavailable',
    },
    model: {
      type: String,
      required: true,
    },
    distance_travelled: {
      type: String,
      required: true,
    },
    route: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
  },
  {
    timestamps: true,
  }
)

export const Fleet = model('Fleet', fleetSchema)

export default Fleet