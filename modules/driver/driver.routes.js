import express from "express";
import * as driverController from "./driver.controller.js";
import * as driverValidator from "./driver.validator.js";


const router = express.Router();

router.post(
 "/",
 driverValidator.bodyValidator(driverValidator.createDriverSchema),
 driverController.createDriver
);

router.get('/', driverController.findDrivers)

router.get(
  "/:id",
  driverValidator.paramsValidator(driverValidator.driverIdSchema),
  driverController.getDriverById
);

router.put(
  "/",
  driverValidator.bodyValidator(driverValidator.updateDriverSchema),
  driverController.updateDriver
);

router.patch(
  "/status/",
  driverValidator.bodyValidator(driverValidator.toggleStatusSchema),
  driverController.toggleDriverStatus
);

router.delete(
  "/:id",
  driverValidator.paramsValidator(driverValidator.driverIdSchema),
  driverController.deleteDriver
);

export default router;