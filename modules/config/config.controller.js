import * as configService from "./config.service.js";
import { successResponse } from "../../util/response.js";
import err from "../../middleware/error.js";

export async function create(req, res, next) {
 try {
  const config = await configService.create(req.body);
  return successResponse(res, config, 201);
 } catch (err) {
  next(err);
 }
}

export async function getConfig(req, res, next) {
 try {
  const config = await configService.getConfig();
  return res.json(config);
 } catch (err) {
  next(err);
 }
}

export async function  updateNotification(req, res, next) {
 try {
  const config = await configService.updateNotification(req.body.deport_location, req.body.notification_template);
  return res.json(config);
 } catch (err) {
  next(err);
 }
}

export async function updateLat_Fat_Table(req, res, next) {
 try {
  const config = await configService.updateLat_Fat_Table(req.body.deport_location, req.body.lat_fat_table);
  return res.json(config);
 } catch (err) {
  next(err);
 }
}
