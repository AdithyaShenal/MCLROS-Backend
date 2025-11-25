import Joi from "joi";

export const createFarmerSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
  address: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  route: Joi.number().integer().min(1).max(6).required(),
});


export default (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
