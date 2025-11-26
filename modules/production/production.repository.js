import Production from "./production.model.js";

export function findAllPending() {
  return Production.find({ status: 'pending' }).sort({ registration_time: -1 });
}