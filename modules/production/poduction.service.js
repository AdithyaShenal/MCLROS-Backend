import * as productionRepository from "./production.repository.js";

export async function getAllPendingProductions() {
  const productions = await productionRepository.findAllPending();
  return productions;
}

export async function blockProduction(production_id) {
  const production = await productionRepository.findById(production_id);
  if (!production) throw new Error("Production record not found");
  
  if (production.status === 'blocked') {
    throw new Error("Production is already blocked");
  }
  
  return productionRepository.updateStatus(production_id, 'blocked');
}