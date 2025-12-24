import Config from "./config.model";

export async function findAll() {
 return await Config.find();
}

export async function create(data) {
 const config = new Config(data);
 return await config.save();
}

export async function update(deport_location, data) {
 return await Config.findOneAndUpdate({deport_location}, data, {
  new: true,
 });
}