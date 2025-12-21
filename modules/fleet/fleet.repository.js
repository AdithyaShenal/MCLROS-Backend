import Fleet from './fleet.model.js'

export async function findAll() {
  return await Fleet.find()
}
export async function findTruckByPlateNo(data) {
 return await Fleet.find(data.plate_no)
}
export async function create(data) {
  const fleet = new Fleet(data)
  return await fleet.save()
}

export async function updateTruck(id, data) {
  return await Fleet.findByIdAndUpdate(id, data, {
    new: true,
    //tells us to return the updated document
  })
}

export async function deleteTruck(id) {
  return await Fleet.findByIdAndDelete(id)
}

export async function findTruckById(id) {
  return await Fleet.findById(id)
}

export async function findTruckByRoute(route) {
  return await Fleet.find({ route })
}

//toggle truck availability
