import express from "express";
import * as dashboardController from "./dashboard.controller.js";
import router from "./../routing/routing.routes";

const router = express.Router();

router.get("/dashboard", dashboardController.getDashboardData);

router.get("/dashboard/:date", dashboardController.getDashboardData);

export default router;
