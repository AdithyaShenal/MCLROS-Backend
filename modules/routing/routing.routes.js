import express from "express";
import { generateRoutesAuto } from "./routing.controller.js";

const router = express.Router();

// Admin Request VRP (Optimized Paths)
router.get("/optimize/auto", generateRoutesAuto);

// Driver fetches assigned route
router.get("/routing/today", (req, res) => {});

export default router;
