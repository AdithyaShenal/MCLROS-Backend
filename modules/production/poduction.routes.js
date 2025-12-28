import express from "express";
import * as productionController from "./production.controller.js";
import * as productionValidator from "./production.validator.js";
import validate from "../middleware/validate.js";

import farmerAuth from "../user/farmer/farmer.auth.js";

const router = express.Router();

router.post(
  "/",
  farmerAuth,
  validate(productionValidator.submitProductionSchema),
  productionController.submitProduction
);

router.get("/today", farmerAuth, productionController.getProductionStatusToday);

router.get("/pending/all", productionController.getAllPendingProductions);

router.post(
  "/:production_id/block",
  validate(productionValidator.blockProductionSchema),
  productionController.blockProduction
);

router.get(
  "/farmer/:farmer_id",
  validate(productionValidator.farmerIdSchema),
  productionController.getProductionsByFarmerId
);

router.get(
  "/route/:route",
  validate(productionValidator.productionRouteSchema),
  productionController.getProductionsByRoute
);

export default router;
