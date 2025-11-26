//import { result } from "lodash";
//import { castArray } from "lodash";
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
        const farmer = await farmerService.getAllFarmers();
        return res.json(farmer);
    }catch(err){
        next(err);
    }
}

export async function getFarmersById(req, res ,next) {
    try{
        const farmer = await farmerService.getFarmersById(req.params.id);
        return res.json(farmer);
    }catch(err){
        next(err);
    }
}

export async function getFarmersByName(req, res, next) {
    try{
        const farmer = await farmerService.getFarmersByName(req.params.name);
        return res.json(farmer);
    }catch(err){
        next(err);
    }
}