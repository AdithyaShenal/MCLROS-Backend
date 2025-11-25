import Farmer from "./farmer.model.js";


export async function create(data) {
  const farmer = new Farmer(data);
  return await farmer.save();
}