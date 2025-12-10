import express from "express";
import {
  generateRoutesAuto,
  generateRouteWiseAll,
  dispatchRoutes,
  generateRouteWise,
  getAllPendingRoutes,
  getRouteById,
  confirmProductionPickup,
  cancelRouteActivation,
  activateRoute,
} from "./routing.controller.js";

const router = express.Router();

// Admin Request VRP Auto Solution (Optimized Paths)
router.get("/optimize/auto", generateRoutesAuto);

// Admin Request VRP Route-Wise Solution For All Routes (Optimized Paths)
router.get("/optimize/route-wise/all", generateRouteWiseAll);

// Admin Request VRP Route-Wise Solution Using Route ID (Optimized Paths)
router.get("/optimize/route-wise/:route_id", generateRouteWise);

// Dispatch Generated Routes
router.post("/dispatch", dispatchRoutes);

// Get all Pending Routes
router.get("/routes/pending", getAllPendingRoutes);

// Get a Pending Route by ID
router.get("/routes/pending/:route_id", getRouteById);

// Confirm pickup
router.post("/routes/confirm/:route_id/:stop_id", confirmProductionPickup);

// Route cancel & Exit
router.post("/routes/cancel/:route_id", cancelRouteActivation);

router.post("/routes/activate", activateRoute);

export default router;
