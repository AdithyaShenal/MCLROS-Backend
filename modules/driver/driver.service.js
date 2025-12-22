import * as driverRepository from "./driver.repository.js";

export async function findAll(){
 const drivers = await driverRepository.findAll();
 if(!drivers || drivers.length === 0) throw errors.NotFoundError('Drivers not found');
 return drivers;
}
export async function createDriver(data) {
 const driver = await driverRepository.findDriverById
}