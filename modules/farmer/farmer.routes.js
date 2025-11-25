import express from "express";
import * as farmerController from "./farmer.controller.js";
import * as farmerValidator from "./farmer.validator.js";
import validate from "../middleware/validate.js";

const router = express.Router();


router.post("/",validate(farmerValidator.createFarmerSchema),farmerController.createFarmer);

export default router;
