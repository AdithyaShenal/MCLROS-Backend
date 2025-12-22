import * as fleetService from './fleet.service.js'
import { successResponse } from '../../util/response.js'

export async function createTruck(req, res, next) {
  try {
    const truck = await fleetService.createTruck(req.body)
    successResponse(res, truck, 201)
  } catch (err) {
    next(err)
  }
}

export async function getAllTrucks(req, res, next) {
  try {
    const trucks = await fleetService.getfleet()
    return res.json(trucks)
  } catch (err) {
    next(err)
  }
}

export async function getTruckById(req, res, next) {
  try {
    const truck = await fleetService.getTruckById(req.params.id)
    return res.json(truck)
  } catch (err) {
    next(err)
  }
}

export async function updateTruck(req, res, next) {
  try {
    const { id } = await fleetRepository.findTruckByPlateNo(req.body.plate_no)
    const truck = await fleetService.updateTruck(id, req.body)
    return res.json(truck)
  } catch (err) {
    next(err)
  }
}

export async function deleteTruck(req, res, next) {
  try {
    await fleetService.deleteTruck(req.params.id)
    return res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export async function getTrucksByRoute(req, res, next) {
  try {
    const trucks = await fleetService.getTrucksByRoute(req.params.route)
    return res.json(trucks)
  } catch (err) {
    next(err)
  }
}

export async function toggleTruckStatus(req, res, next) {
  try {
    const truck = await fleetService.toggleTruckStatus(req.body)
    return res.json(truck)
  } catch (err) {
    next(err)
  }
}