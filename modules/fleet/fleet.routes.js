import express from 'express'
import * as fleetController from './fleet.controller.js'
import * as fleetValidator from './fleet.validator.js'
import validate from '../middleware/validate.js'

const router = express.Router()

router.get(
  '/',
  validate(fleetValidator.createTruckSchema),
  fleetController.getAllTrucks
)

router.post(
  '/',
  validate(fleetValidator.postTruckSchema),
  fleetController.createTruck
)

router.put(
  '/',
  validate(fleetValidator.updateTruckSchema),
  fleetController.updateTruck
)

router.delete(
  '/:id',
  validate(fleetValidator.get_delete_TruckSchema),
  fleetController.deleteTruck
)

router.get(
  '/:id',
  validate(fleetValidator.get_delete_TruckSchema),
  fleetController.getTruckById
)

router.get('/:route',validate(fleetValidator.routeTruckSchema),fleetController.getTruckByRoute)
