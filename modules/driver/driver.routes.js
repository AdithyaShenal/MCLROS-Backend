import express from "express";
import * as driverController from "./driver.controller.js";
import * as driverValidator from "./driver.validator.js";
import validate from '../middleware/validate.js'

const router = express.Router();

router.post(
 "/",
 validate(driverValidator.createDriverSchema),
 driverController.createDriver
);

router.get('/', driverController.findDrivers)

router.get(
  "/:id",
  validate(driverValidator.driverIdSchema),
  driverController.getDriverById
);

router.put(
  "/",
  validate(driverValidator.updateDriverSchema),
  driverController.updateDriver
);

router.put(
  "/status/",
  validate(driverValidator.toggleStatusSchema),
  driverController.toggleDriverStatus
);

router.delete(
  "/:id",
  validate(driverValidator.driverIdSchema),
  driverController.deleteDriver
);

export default router;