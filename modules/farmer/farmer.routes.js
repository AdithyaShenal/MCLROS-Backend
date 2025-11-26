import express from "express";
import * as farmerController from "./farmer.controller.js";
import * as farmerValidator from "./farmer.validator.js";
import validate from "../middleware/validate.js";

const router = express.Router();


router.post("/",validate(farmerValidator.createFarmerSchema),farmerController.createFarmer);

router.get("/all",farmerController.getAllFarmers);

router.get("/:id",validate(farmerValidator.farmerIdSchema),farmerController.getFarmersById);

router.get("/name/:name",validate(farmerValidator.farmerNameSchema),farmerController.getFarmersByName);

router.get("/route/:route",validate(farmerValidator.farmerRouteSchema),farmerController.getFarmersByRoute);

export default router;
