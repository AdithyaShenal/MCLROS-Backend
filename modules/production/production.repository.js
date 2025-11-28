import Production from "./production.model.js";

export async function submit(data) {
  const production = new Production(data);
  return await production.save();
}

export async function findAllPending() {
  return await Production.find({ status: "pending" }).sort({
    registration_time: -1,
  });
}

export async function findById(id) {
  return Production.findById(id);
}

export async function updateStatus(id, status) {
  return Production.findByIdAndUpdate(id, { status }, { new: true });
}

export async function findByFarmerId(farmer_id) {
  return await Production.find({ farmer_id }).sort({ registration_time: -1 });
}

export async function findByRoute(route) {
  return await Production.find({ route }).sort({ registration_time: -1 });
}
