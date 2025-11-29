import * as productionService from "./poduction.service.js";
import { getFarmersById } from "../farmer/farmer.service.js";

export async function submitProduction(req, res, next) {
  try {
    const farmer = await getFarmersById(req.body.farmer_id);
    if (!farmer)
      return res
        .status(400)
        .json({ success: false, message: "No farmer found for given id" });

    let production = {
      farmer: {
        _id: farmer._id,
        name: farmer.name,
        location: farmer.location,
        address: farmer.address,
        phone: farmer.phone,
        route: farmer.route,
      },

      volume: req.body.volume,
    };

    production = await productionService.submitProduction(production);

    return res.json(production);
  } catch (err) {
    next(err);
  }
}

export async function getAllPendingProductions(req, res, next) {
  try {
    const productions = await productionService.getAllPendingProductions();
    return res.json(productions);
  } catch (err) {
    next(err);
  }
}

export async function blockProduction(req, res, next) {
  try {
    const production = await productionService.blockProduction(
      req.params.production_id
    );
    return res.json({
      message: "Production blocked successfully",
      production,
    });
  } catch (err) {
    next(err);
  }
}

export async function getProductionsByFarmerId(req, res, next) {
  try {
    const productions = await productionService.getProductionsByFarmerId(
      req.params.farmer_id
    );
    return res.json(productions);
  } catch (err) {
    next(err);
  }
}

export async function getProductionsByRoute(req, res, next) {
  try {
    const productions = await productionService.getProductionsByRoute(
      parseInt(req.params.route)
    );
    return res.json(productions);
  } catch (err) {
    next(err);
  }
}
