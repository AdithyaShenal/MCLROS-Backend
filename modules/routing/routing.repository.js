import Production from "../production/production.model.js";
import Route from "./routing.model.js";

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

export async function getAllPendingRoutes() {
  const pendingRoutes = await Route.find({ status: "dispatched" });

  return pendingRoutes;
}

export async function getRouteById(route_id) {
  const pendingRoute = await Route.findById(route_id);

  return pendingRoute || null;
}

export async function saveRoute(route) {
  // const route = new Route(route); -> this will create new one wrong!
  // await route.save();

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
