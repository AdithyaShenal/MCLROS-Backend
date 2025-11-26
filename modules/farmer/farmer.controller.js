import * as farmerService from "./farmer.service.js";

export async function createFarmer(req, res, next) {
  try {
    const farmer = await farmerService.createFarmer(req.body);
    return res.status(201).json(farmer);
  } catch (err) {
    next(err);
  }
}

export async function getAllFarmers(req, res, next){
    try{
        const farmers = await farmerService.getAllFarmers();
        return res.json(farmers);
    }catch(err){
        next(err);
    }
}