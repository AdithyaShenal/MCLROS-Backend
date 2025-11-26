import mongoose from 'mongoose';

const qualitySchema = new mongoose.Schema({
  fat: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  density: {
    type: Number,
    required: true
  },
  water_ratio: {
    type: Number,
    required: true
  }
});

const productionSchema = new mongoose.Schema({
  farmer_name: {
    type: String,
    required: true,
    trim: true
  },
  farmer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  volume: {
    type: Number,
    required: true,
    min: 0
  },
  registration_time: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'blocked'],
    default: 'pending'
  },
  quality: {
    type: qualitySchema,
    required: true
  },
  route: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  }
}, {
  timestamps: true
});


export default mongoose.model('Production', productionSchema);