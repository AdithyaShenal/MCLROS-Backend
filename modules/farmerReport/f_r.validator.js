import joi from 'joi'
import mongoose, { Query } from 'mongoose'

const objectID = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Inavlid ObjectID')
  }
  return value
}
export const createReportSchema = joi.object({
  farmerID: joi.string().custom(objectID).required(),
  report: joi.string().required(),
  adminID: joi.string().custom(objectID),
  status: joi.string().valid('pending', 'resolved').required(),
})

export const ReportIDSchema = joi.object({
  id: joi.string().required(),
})

export const getAllSchema = joi.object({
  all: joi.boolean().optional(),
})

export const updateReportSchema = joi.object({
 report:joi.string(),
 status:joi.string().valid("pending","resolved")
})

export const bodyValidator=(req,res,next)=>{

}