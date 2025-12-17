import express from "express";
import {
  generateRoutesAuto,
  generateRouteWiseAll,
  dispatchRoutes,
  generateRouteWise,
  getPendingRoutesController,
  getRouteById,
  confirmProductionPickup,
  cancelRouteActivation,
  activateRoute,
  issuePickupReport,
  routeCompletetionController,
  getCompletedRoutesController,
} from "./routing.controller.js";

const router = express.Router();

// Admin Request VRP Auto Solution (Optimized Paths)
router.get("/optimize/auto", generateRoutesAuto);

// Admin Request VRP Route-Wise Solution For All Routes (Optimized Paths)
router.get("/optimize/route-wise/all", generateRouteWiseAll);

// Admin Request VRP Route-Wise Solution Using Route ID (Optimized Paths)
router.get("/optimize/route-wise/:route_id", generateRouteWise);

// Dispatch Generated Routes (Handle Idemponency)
router.post("/dispatch", dispatchRoutes);

// Get a Pending Route by ID
router.get("/routes/:route_id", getRouteById);

// Get all Pending Routes (Driver App)
router.get("/routes/pending_routes/:driver_id", getPendingRoutesController);

// Confirm pickup (Handle Idemponency Done) Checked
router.post("/routes/confirm", confirmProductionPickup);

// issue a report about pickup
router.post("/routes/pickup/report", issuePickupReport);

// Route cancel & Exit (Handle Idemponency)
router.post("/routes/cancel/:route_id", cancelRouteActivation);

// Route activation (Handle Idemponency Done) Checked
router.post("/routes/activate", activateRoute);

// Route Completetion
router.post("/routes/complete/:route_id", routeCompletetionController);

// Get all the completed routes of drivers
router.get("/routes/driver/:driver_id", getCompletedRoutesController);

export default router;
