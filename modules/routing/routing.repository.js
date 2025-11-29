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
