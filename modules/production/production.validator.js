import Joi from 'joi';

export const blockProductionSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('blocked').required()
  })
});

export const farmerIdSchema = Joi.object({
  params: Joi.object({
    farmer_id: Joi.string().required()
  })
});