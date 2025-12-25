import * as configController from "./config.controller.js";
import * as configValidator from "./config.validator.js";
import express from "express";

const router = express.Router();

router.get(
 "/",
 configController.getConfig
);

router.post(
 "/",
 configValidator.bodyValidator(configValidator.createConfigSchema),
 configController.create
);

router.patch(
 "/",
 configValidator.bodyValidator(configValidator.configTemplateSchema),
 configController.updateNotification
);

router.patch(
 "/",
 configValidator.bodyValidator(configValidator.configLat_Fat_TableSchema),
 configController.updateLat_Fat_Table
);


