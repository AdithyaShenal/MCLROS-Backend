import mongoose from "mongoose";

const embeddedFarmerSchema = new mongoose.Schema(
  {
    name: String,
    location: {
      lat: Number,
      lon: Number,
    },
    address: String,
    phone: String,
  },
  { _id: false }
);

const qualitySchema = new mongoose.Schema({
  fat: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  density: {
    type: Number,
  },
  water_ratio: {
    type: Number,
  },
});

const productionSchema = new mongoose.Schema(
  {
    farmer: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true,
      },
      info: {
        type: embeddedFarmerSchema,
        required: true,
      },
    },
    volume: {
      type: Number,
      required: true,
      min: 0,
    },
    registration_time: {
      type: Date,
      default: Date.now,
      required: true,
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
    quality: {
      type: qualitySchema,
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
);

const Production = mongoose.model("Production", productionSchema);

export default Production;
