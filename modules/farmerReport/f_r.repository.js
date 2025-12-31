import FarmerReport from './f_r.model.js'

export async function create(data) {
  const farmer_report = new FarmerReport(data)
  return await farmer_report.save()
}

export async function delete_report(id) {
  return await FarmerReport.findByIdAndDelete(id)
}



export async function get_report(id) {
  return await FarmerReport.findById(id).populate("farmerID","name phone").populate("adminID","name")
}


