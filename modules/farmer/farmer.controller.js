import * as farmerService from "./farmer.service.js";

export async function createFarmer(req, res, next) {
  try {
    const farmer = await farmerService.createFarmer(req.body);
    return res.status(201).json(farmer);
  } catch (err) {
    next(err);
  }
}
