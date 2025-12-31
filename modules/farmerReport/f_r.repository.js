import FarmerReport from "./f_r.model";

export async function create(data) {
 const farmer_report=new FarmerReport(data)
 return await farmer_report.save();
}