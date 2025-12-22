import * as driverRepository from "./driver.repository.js";

export async function findAll(){
 const drivers = await driverRepository.findAll();
 if(!drivers || drivers.length === 0) throw errors.NotFoundError('Drivers not found');
 return drivers;
}
export async function createDriver(data) {
 const driver = await driverRepository.findDriverByLicenseNo(data.license_no); //check if driver already exists()
 if(driver) throw errors.BadRequestError("Driver already exists");
 return await driverRepository.create(data);
}

export async  function updateDriver(id, data) {
 const driver = await driverRepository.findDriverById(id);
 if(!driver) throw errors.NotFoundError("Driver not found");
 return await driverRepository.update(id, data);
}

export async function deleteDriver(id) {
 const driver = await driverRepository.findDriverById(id);
 if(!driver) throw errors.NotFoundError("Driver not found");
 return await driverRepository.delete_driver(id);
}

export async function getDriverById(id) {
 const driver = await driverRepository.findDriverById(id);
 if(!driver) throw errors.NotFoundError("Driver not found");
 return driver;
}

export async function getDriverByLicenseNo(license_no) {
 const driver = await driverRepository.findDriverByLicenseNo(license_no);
 if(!driver) throw errors.NotFoundError("Driver not found");
 return driver;
}

export async function toggleDriverStatus(license_no, status) {
 const driver = await driverRepository.findDriverByLicenseNo(license_no);
 if(!driver) throw errors.NotFoundError("Driver not found");
 return await driverRepository.toggleStatus(license_no, status);
}