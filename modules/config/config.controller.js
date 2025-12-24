import configService from "./config.service.js";
import { successResponse } from "../../util/response.js";
import err from "../../middleware/error.js";

export async function createConfig(req, res, next) {
 try {
  const config = await configService.createConfig(req.body);
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

export async function updateConfig(req, res, next) {
 try {
  const config = await configService.updateConfig(req.params.id, req.body);
  return res.json(config);
 } catch (err) {
  next(err);
 }
}
