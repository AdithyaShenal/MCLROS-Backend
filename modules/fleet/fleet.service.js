import * as fleetRepository from "./fleet.repository.js";
import * as errors from "../../errors/errors.js";

export async function getfleet() {
 const trucks = await fleetRepository.findAll();
 if (!trucks || trucks.length === 0)
  //cuz sometimes trucks is null
   throw new errors.NotFoundError('Trucks not found')
 return trucks;
 }

 export async function createTruck(data) {
  const truck= await fleetRepository.findTruckByPlateNo(data.plate_no);
  if(truck){throw new errors.BadRequestError('Truck already exists')} 
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

  export async function getTrucksByRoute(route) {
    const trucks = await fleetRepository.findTrucksByRoute(route)
    if (!trucks || trucks.length === 0) {
      throw new errors.NotFoundError('Fleet not found')
    }
    return trucks
  }

  export async function findTruckByPlateNo(plate_no) {
    const truck = await fleetRepository.findTruckByPlateNo(plate_no);
    if(!truck) throw errors.NotFoundError("Truck not found");
    return truck;
  }

  export async function toggleTruckStatus(plate_no,status) {
    const truck = await fleetRepository.findTruckByPlateNo(plate_no);
    if(!truck) throw errors.NotFoundError("Truck not found");
    return await fleetRepository.toggleStatus(plate_no,status);
  }
