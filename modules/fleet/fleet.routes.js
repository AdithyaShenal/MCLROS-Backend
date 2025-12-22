import express from 'express'
import * as fleetController from './fleet.controller.js'
import * as fleetValidator from './fleet.validator.js'
import validate from '../middleware/validate.js'

const router = express.Router()

router.get(
  '/',
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
  validate(fleetValidator.truckIdSchema),
  fleetController.deleteTruck
)

router.get(
  '/:id',
  validate(fleetValidator.truckIdSchema),
  fleetController.getTruckById
)

router.get(
  'routes/:route',
  validate(fleetValidator.routeTruckSchema),
  fleetController.getTrucksByRoute
)
router.post(
  '/status/',validate(fleetValidator.toggleStatusSchema),
  fleetController.toggleTruckStatus
)
export default router
