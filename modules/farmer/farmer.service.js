import * as farmerRepository from "./farmer.repository.js";

export async function createFarmer(data) {
  return await farmerRepository.create(data);
}

export async function getAllFarmers(){
    const farmers = await farmerRepository.findAll();
    return farmers;
}