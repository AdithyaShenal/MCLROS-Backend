import express from "express";
import * as productionController from "./production.controller.js";
import * as productionValidator from "./production.validator.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.get("/pending/all", productionController.getAllPendingProductions);

router.post(
  "/:production_id/block",
  validate(productionValidator.productionIdSchema),
  productionController.blockProduction
);

router.get(
  "/farmer/:farmer_id",
  validate(productionValidator.farmerIdSchema),
  productionController.getProductionsByFarmerId
);

export default router;