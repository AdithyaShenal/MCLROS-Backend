// import mongoose from "mongoose";

// // Embedded Production schema inside Stop
// const embeddedProductionSchema = new mongoose.Schema(
//   {
//     _id: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//     farmer: {
//       farmer_name: { type: String, required: true },
//       farmer_id: { type: String, required: true },
//       location: {
//         lat: { type: Number, required: true },
//         lon: { type: Number, required: true },
//       },
//     },
//     volume: { type: Number, required: true },
//     registration_time: { type: Date, required: true },
//     status: { type: String, enum: ["block", "pending"], required: true },
//   },
//   { _id: false }
// ); // prevent nested _id creation

// // Stop schema with embedded production
// const stopSchema = new mongoose.Schema({
//   order: { type: Number, required: true },
//   production: { type: embeddedProductionSchema, required: true },
//   lat: { type: Number, required: true },
//   lon: { type: Number, required: true },
// });

// // Route schema
// const routeSchema = new mongoose.Schema(
//   {
//     vehicle_id: { type: Number, required: true },
//     stops: { type: [stopSchema], required: true },
//   },
//   { timestamps: true }
// );

// {
//   productions: [
//     { production_id: 1, lon: 10, lat: 10 },
//     { production_id: 2, lon: 12, lat: 22 },
//     { production_id: 1, lon: 10, lat: 13 },
//   ];

//   vehicles: [
//     { vehicle_id: 1, capacity: 1000, availability: true },
//     { vehicle_id: 2, capacity: 1500, availability: true },
//     { vehicle_id: 3, capacity: 200, availability: true },
//   ];
// }
