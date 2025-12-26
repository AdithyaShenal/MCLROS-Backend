import joi from 'joi'

export const createConfigSchema = joi.object({
deport_location: joi.object({ lat: joi.number().required(), lon: joi.number().required() })
}).unknown(false)
//unknown(false) is pure js fuction not a joi

export const configTemplateSchema = joi.object({
 deport_location: joi.object({ lat: joi.number().required(), lon: joi.number().required() }),
  notification_template: joi.string().required().pattern(/\d/),
}).unknown(false)

export const configLat_Fat_TableSchema = joi.object({
  deport_location: joi.object({ lat: joi.number().required(), lon: joi.number().required() }),
  lat_fat_table: joi.object({
   lat: joi.array().items(joi.number()).required(),
   fat: joi.array().items(joi.number()).required(),
   rates: joi.array().items(joi.number()).required(),
  }),
}).unknown(false)


export const bodyValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  }
}

