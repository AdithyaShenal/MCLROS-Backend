import * as driverService from "./driver.service.js";
import { successResponse } from "../../util/response.js";

export async function createDriver(req, res,next) {
 try {
  const driver = await driverService.createDriver(req.body);
  return successResponse(res, driver, 201);
 } catch (err) {
  next(err);
 }
}

export async function findDrivers(req, res, next) {
 try {
  const drivers = await driverService.findAll();
  return res.json(drivers);
 } catch (err) {
  next(err);
 }
 
}

export async function updateDriver(req, res, next) {
 try {
  const {id} = await driverService.getDriverByLicenseNo(req.body.driver_license_no);
  const driver = await driverService.updateDriver(id, req.body);
  return res.json(driver);
 } catch (err) {
  next(err);
 }
}

export async function getDriverById(req, res, next) {
 try {
  const driver = await driverService.getDriverById(req.params.id);
  return res.json(driver);
 } catch (err) {
  next(err);
 }
}

export async function deleteDriver(req, res, next) {
 try {
  await driverService.deleteDriver(req.params.id);
  return res.status(204).send();
 } catch (err) {
  next(err);
 }
}

export async function toggleDriverStatus(req, res, next) {
 try {
  const driver = await driverService.toggleDriverStatus(req.body.driver_license_no, req.body.status);
  return res.json(driver);
 } catch (err) {
  next(err);
 }
}