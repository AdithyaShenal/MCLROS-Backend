import Production from "./production.model.js";

export function findAllPending() {
  return Production.find({ status: 'pending' }).sort({ registration_time: -1 });
}

export function findByFarmerId(farmer_id) {
  return Production.find({ farmer_id }).sort({ registration_time: -1 });
}

export function findByRoute(route) {
  return Production.find({ route }).sort({ registration_time: -1 });
}