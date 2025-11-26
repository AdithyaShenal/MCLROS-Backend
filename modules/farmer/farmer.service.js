import * as farmerRepository from "./farmer.repository.js";

export async function createFarmer(data) {
  return await farmerRepository.create(data);
}

export async function getAllFarmers(){
    const farmers = await farmerRepository.findAll();
    return farmers;
}

export async function getFarmersById(id){
    const farmer = await farmerRepository.findById(id);
    if(!farmer) throw new Error("Farmer not found!");

    return farmer;
}