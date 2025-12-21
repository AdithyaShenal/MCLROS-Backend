import joi from "joi";

export const createTruckSchema = joi.object({
 plate_no: joi.string().required(),
 max_capacity: joi.number().min(0).max(2500).required(),
 depot_location: joi.string().required(),
 status: joi.string().valid("available", "unavailable", "inService").required(),
 model: joi.string().required(),
 distance_travelled: joi.string().required(),
 route:joi.number().valid(1,2,3,4,5,6).required(),
});

export const truckIdSchema = joi.object({
  params: joi.object({
    id: joi.string().required(),
  }),
});

export const fleetRouteSchema = joi.object({
  params: joi.object({
    route: joi.number().integer().min(1).max(6).required(),
  }),
});

export const updateTruckSchema = joi.object({
  plate_no: joi.string().required(),
  max_capacity: joi.number().min(0).max(2500).required(),
  depot_location: joi.string().required(),
  status: joi.string().valid("available", "unavailable", "inService").required(),
  model: joi.string().required(),
  distance_travelled: joi.string().required(),
  route:joi.number().valid(1,2,3,4,5,6).required(),
});

export const deleteTruckSchema = joi.object({
  params: joi.object({
    id: joi.string().required(),
  }),
});

export const statusTruckSchema = joi.object({
  body: joi.object({
    status: joi.string().valid("available", "unavailable", "inService").required(),
  }),
});