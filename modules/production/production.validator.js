import Joi from 'joi';

export const blockProductionSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('blocked').required()
  })
});