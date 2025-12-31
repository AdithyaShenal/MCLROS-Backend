import mongoose from 'mongoose'

const farmerReportSchema = new monggoose.Schema(
  {
    farmerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'farmer',
      require: true,
    },
    report: {
      type: String,
      require: true,
    },
    adminID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'admin',
      require: true,
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
