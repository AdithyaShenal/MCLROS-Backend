import Driver from "./driver.model.js";

export async function create(data) {
 const driver = new Driver(data);
 return await driver.save();
}

export async function update(id,data) {
 return await Driver.findByIdAndUpdate(id,data,{new:true});
}

export async function delete_driver(id) {
 return await Driver.findByIdAndDelete(id);
}

export async function findAll(){
 return await Driver.find();
}

export async function findDriverById(id){
 return await Driver.findById(id);
}

export async function toggleStatus(driver_license_no, status) {
  return await Driver.findOneAndUpdate(
    {driver_license_no}, {
    $set:{status}}, {
    new: true
  })
}

export async function findDriverByLicenseNo(driver_license_no) {
  return await Driver.findOne({driver_license_no});
}

