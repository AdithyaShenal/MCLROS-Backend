import mongoose from 'mongoose'

const lat_fat_tableSchema = new mongoose.Schema({
  lat: { type: [Number], required: true },
  fat: { type: [Number], required: true },
  rates: { type: [[Number]], required: true },
})

const configSchema = new mongoose.Schema(
  {
    deport_location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },unique: true
    ,
    notification_template: {
      type: String,
      match: [/\d/, 'templet should contain the volume'], //givin the message template and it will take atleast even one value
    },
    lat_fat_table: {
      type: lat_fat_tableSchema,
      
    },
  },
  { timestamps: true }
)

const Config = mongoose.model('Config', configSchema)
export default Config
