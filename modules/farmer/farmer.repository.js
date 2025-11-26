import Farmer from "./farmer.model.js";


export async function create(data) {
  const farmer = new Farmer(data);
  return await farmer.save();
}

export async function findAll(){
    return await Farmer.find();
}

export async function findById(id) {
    return await Farmer.findById(id);
}

export async function findByName(name) {
    return await Farmer.find({
        name:{ $regex: name, $options: "i"}
    });
}