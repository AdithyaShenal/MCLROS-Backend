import * as fleetRepository from "./fleet.repository.js";
import * as errors from "../../errors/errors.js";

export async function getfleet() {
 const trucks = await fleetRepository.findAll();
 if(!trucks) throw errors.NotFoundError("Trucks not found");
 return trucks;
 }

 export async function createTruck(data) {
  const truck= await fleetRepository.findTruckByPlateNo(data.plate_no);
  if(truck) throw errors.BadRequestError("Truck already exists");
  return await fleetRepository.create(data);
 
}

export async function updateTruck(id, data) {
  const truck = await fleetRepository.findTruckById(id);
  if(!truck) throw errors.NotFoundError("Truck not found");
  return await fleetRepository.update(id, data);
}

export async function deleteTruck(id) {
  const truck = await fleetRepository.findTruckById(id);
  if(!truck) throw errors.NotFoundError("Truck not found");
  return await fleetRepository.delete_Truck(id);
}

export async function getTruckById(id) {
  const truck = await fleetRepository.findTruckById(id);
  if(!truck) throw errors.NotFoundError("Truck not found");
  return truck;}

  export async function getFleetByRoute(route_id) {
    const fleet = await fleetRepository.findTruckByRoute(route_id);
    if(!fleet) throw errors.NotFoundError("Fleet not found");
    return fleet;
  }



