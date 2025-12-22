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

export async function findById(id){
 return await Driver.findById(id);
}

