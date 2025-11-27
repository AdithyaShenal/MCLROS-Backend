import * as productionService from "./poduction.service.js";

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
    const production = await productionService.blockProduction(req.params.production_id);
    return res.json({ 
      message: "Production blocked successfully", 
      production 
    });
  } catch (err) {
    next(err);
  }
}

export async function getProductionsByFarmerId(req, res, next) {
  try {
    const productions = await productionService.getProductionsByFarmerId(req.params.farmer_id);
    return res.json(productions);
  } catch (err) {
    next(err);
  }
}
