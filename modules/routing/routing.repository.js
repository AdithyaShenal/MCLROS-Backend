import Production from "../production/production.model.js";
import Route from "./routing.model.js";
import mongoose from "mongoose";

export async function getPendingProduction() {
  return await Production.find({ blocked: false, status: "pending" });
}

export async function saveRoutes(routes) {
  try {
    await Route.insertMany(routes);
  } catch (err) {
    throw new Error("Failed to save routes: " + err.message);
  }
}

export async function getPendingProductionByRoute(route) {
  return await Production.find({
    blocked: false,
    status: "pending",
    "farmer.route": route,
  });
}

export async function getPendingRoutesRepo(driver_id) {
  const pendingRoutes = await Route.find({
    $or: [
      { status: "dispatched" },
      {
        status: "inProgress",
        driver_id: new mongoose.Types.ObjectId(driver_id),
      },
    ],
  });

  return pendingRoutes;
}

export async function getRouteById(route_id) {
  const pendingRoute = await Route.findById(route_id);
  return pendingRoute || null;
}

export async function saveRoute(route) {
  return await route.save();
}

export async function updateProductionState(production_id, status) {
  return await Production.findByIdAndUpdate(
    production_id,
    { status: status },
    { new: true }
  );
}

export async function bulkUpdateProductionsToAwaiting(productionIds) {
  return await Production.updateMany(
    { _id: { $in: productionIds } },
    { status: "awaiting pickup" }
  );
}

export async function updateProductionOnPickup(
  route_id,
  production_id,
  driver_id,
  collectedVolume
) {
  const route = await Route.findOneAndUpdate(
    {
      _id: route_id,
      active: true,
      driver_id: driver_id,
      "stops.production._id": production_id,
      "stops.production.status": { $ne: "collected" },
    },
    {
      $set: {
        "stops.$.production.status": "collected",
        "stops.$.production.collectedVolume": collectedVolume,
      },
    },
    {
      new: true,
      projection: { _id: 1 },
    }
  );

  return route;
}

export async function getCompletedRoutesByDriver(driver_id) {
  const routes = await Route.find({
    driver_id: driver_id,
    active: false,
    status: "completed",
  });

  return routes;
}
