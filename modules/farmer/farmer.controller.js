// import { InternalError } from "../../error/errors.js";
import * as farmerService from "./farmer.service.js";
import { successResponse } from "../util/response.js";

export async function createFarmer(req, res, next) {
  // throw new InternalError("This is a internal error");

  try {
    const farmer = await farmerService.createFarmer(req.body);
    successResponse(res, farmer, 201);
  } catch (err) {
    next(err);
  }
}

export async function getAllFarmers(req, res, next) {
  try {
    const farmer = await farmerService.getAllFarmers();
    return res.json(farmer);
  } catch (err) {
    next(err);
  }
}

export async function getFarmersById(req, res, next) {
  try {
    const farmer = await farmerService.getFarmersById(req.params.id);
    return res.json(farmer);
  } catch (err) {
    next(err);
  }
}

export async function getFarmersByName(req, res, next) {
  try {
    const farmer = await farmerService.getFarmersByName(req.params.name);
    return res.json(farmer);
  } catch (err) {
    next(err);
  }
}

export async function getFarmersByRoute(req, res, next) {
  try {
    const farmers = await farmerService.getFarmersByRoute(
      parseInt(req.params.route)
    );
    return res.json(farmers);
  } catch (err) {
    next(err);
  }
}

export async function updateFarmer(req, res, next) {
  try {
    const farmer = await farmerService.updateFarmer(req.params.id, req.body);
    return res.json(farmer);
  } catch (err) {
    next(err);
  }
}

export async function deleteFarmer(req, res, next) {
  try {
    await farmerService.deleteFarmer(req.params.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
