import * as farmerReportRepo from './f_r.repository.js'
import { findById } from '../farmer/farmer.repository.js'
import * as errors from '../../errors/errors.js'

export async function create(data) {
  const farmer = await findById(data.farmerID)
  if (!farmer) {
    throw new errors.NotFoundError('farmer id is not found')
  }
  return farmerReportRepo.create(data)
}

export async function delete_report(id) {
  const report = await farmerReportRepo.findById(id)
  if (!report) {
    throw new errors.NotFoundError('report is not found')
  }
  return farmerReportRepo.delete_report(id)
}
