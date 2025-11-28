import * as productionRepository from "./production.repository.js";

export async function submitProduction(data) {
  const production = await productionRepository.submit(data);
  return production;
}

export async function getAllPendingProductions() {
  const productions = await productionRepository.findAllPending();
  return productions;
}

export async function blockProduction(production_id) {
  const production = await productionRepository.findById(production_id);
  if (!production) throw new Error("Production record not found");

  if (production.status === "blocked") {
    throw new Error("Production is already blocked");
  }

  return productionRepository.updateStatus(production_id, "blocked");
}

export async function getProductionsByFarmerId(farmer_id) {
  const productions = await productionRepository.findByFarmerId(farmer_id);
  if (!productions || productions.length === 0)
    throw new Error("No production records found for this farmer");
  return productions;
}

export async function getProductionsByRoute(route) {
  const productions = await productionRepository.findByRoute(route);
  if (!productions || productions.length === 0)
    throw new Error("No production records found for this route");
  return productions;
}
