import mongoose from 'mongoose'

const farmerReportSchema = new mongoose.Schema(
  {
    farmerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'farmer',
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
    adminID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'admin',
    },
    feedback: {
      type: String,
    },
    reply_time: {
      type: mongoose.Schema.Types.Date,
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

const FarmerReport = mongoose.model('FarmerReport', farmerReportSchema)

export default FarmerReport
