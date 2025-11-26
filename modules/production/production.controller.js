import * as productionService from "./poduction.service.js";

export async function getAllPendingProductions(req, res, next) {
  try {
    const productions = await productionService.getAllPendingProductions();
    return res.json(productions);
  } catch (err) {
    next(err);
  }
}