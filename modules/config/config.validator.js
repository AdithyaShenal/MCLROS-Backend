import joi from 'joi'

export const createConfigSchema = joi.object({
deport_location: joi.object({ lat: joi.number().required(), lon: joi.number().required() }).unique().required(),
lat_fat_table: joi.object({
 lat: joi.array().number(),
 fat: joi.array().numer(),
 rates: joi.array().number(),
}),
notification_template: joi.string().pattern(/\d/),
})

export const configTemplateSchema = joi.object({
 deport_location: joi.object({ lat: joi.number().required(), lon: joi.number().required() }).unique().required(),
  notification_template: joi.string().required().pattern(/\d/),
})

export const configLat_Fat_TableSchema = joi.object({
  deport_location: joi.object({ lat: joi.number().required(), lon: joi.number().required() }.required()),
  lat_fat_table: joi.object({
   lat: joi.array().number(),
   fat: joi.array().numer(),
   rates: joi.array().number(),
  }).required(),
})
