import express from "express";
import * as productionController from "./production.controller.js";
import * as productionValidator from "./production.validator.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.get("/pending/all", productionController.getAllPendingProductions);

export default router;