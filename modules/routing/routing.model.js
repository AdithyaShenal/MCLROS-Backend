import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({});

const Route = mongoose.model("route", routeSchema);

export default Route;
