import * as fleetRepository from "./fleet.repository.js";
import * as errors from "../../errors/errors.js";

export async function getAllTrucks() {
 const trucks = await fleetRepository.findAll();
 if(!trucks) throw errors.NotFoundError("Trucks not found");
 return trucks;
 }

 export async function createTruck(data) {
  const truck= await fleetRepository.findTruckByPlateNo(data.plate_no);
  if(truck) throw errors.BadRequestError("Truck already exists");
  return await fleetRepository.create(data);
 
}


