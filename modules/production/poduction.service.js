import * as productionRepository from "./production.repository.js";

export async function getAllPendingProductions() {
  const productions = await productionRepository.findAllPending();
  return productions;
}