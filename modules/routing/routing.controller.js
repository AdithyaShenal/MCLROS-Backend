import * as routingService from "./routing.service.js";

export async function generateRoutesAuto(req, res) {
  const routes = await routingService.generateRoutesAuto();
  return res.status(200).json(routes);
}

export async function generateRouteWiseAll(req, res) {
  const routes = await routingService.generateRouteWiseAll();
  return res.status(200).json(routes);
}

export async function generateRouteWise(req, res) {
  const routes = await routingService.generateRouteWise(req.params.route_id);
  return res.status(200).json(routes);
}

export async function dispatchRoutes(req, res) {
  const routes = await routingService.dispatchRoutes(req.body);
  return res
    .status(201)
    .json({ success: true, message: "Successfully dispatched." });
}

// Get all Pending Routes
export async function getAllPendingRoutes(req, res) {
  const pendingRoutes = await routingService.getAllPendingRoutes();
  return res.status(200).json(pendingRoutes);
}

// Get a Pending Route by ID (Not implemented)
export async function getRouteById(req, res) {
  const pendingRoute = await routingService.getRouteById(req.params.route_id);
  return res.status(200).json(pendingRoute);
}

export async function confirmProductionPickup(req, res) {
  const { route_id, stop_id } = req.params;

  await routingService.confirmProductionPickup(route_id, stop_id);

  return res.status(200).json({
    success: true,
    message: "Pickup confirmed.",
  });
}

export async function cancelRouteActivation(req, res) {
  const route_id = req.params.route_id;

  await routingService.cancelRouteActivation(route_id);

  return res.status(200).json({
    success: true,
    message: "Route successfully restored",
  });
}
