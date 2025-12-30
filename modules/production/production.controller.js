import * as productionService from "./poduction.service.js";
import { getFarmersById } from "../farmer/farmer.service.js";
import Production from "./production.model.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import _ from "lodash";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function submitProduction(req, res, next) {
  const farmer_id = req.user._id;
  const volume = req.body.volume;

  const savedProd = await productionService.submitProduction(farmer_id, volume);

  res.status(200).json(savedProd);
}

export async function getMyProductions(req, res) {
  const productions = await productionService.getMyProductions(req.user._id);

  res.status(200).json(productions);
}

export async function getProductionStatusToday(req, res, next) {
  const farmerId = req.user._id;
  const tz = "Asia/Colombo";

  const startOfDay = dayjs().tz(tz).startOf("day").utc().toDate();
  const endOfDay = dayjs().tz(tz).endOf("day").utc().toDate();

  const existing = await Production.findOne({
    "farmer._id": farmerId,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  }).lean(); // important for lodash + performance

  if (existing) {
    const production = _.pick(existing, [
      "_id",
      "volume",
      "status",
      "registration_time",
      "failure_reason",
      "collectedVolume",
      "blocked",
    ]);

    return res.json({
      registered: true,
      message: "Milk already submitted today",
      production,
    });
  }

  return res.json({
    registered: false,
    message: "No milk submitted today",
    production: null,
  });
}

// Update submitted production
export async function updateProductionController(req, res) {
  const farmer_id = req.user._id;
  const production_id = req.params.production_id;
  const volume = req.body.volume;

  const production = await productionService.updateProductionService(
    farmer_id,
    production_id,
    volume
  );

  res.status(200).json(production);
}

// Delete submitted production
export async function deleteProductionController(req, res) {
  const farmer_id = req.user._id;
  const production_id = req.params.production_id;

  await productionService.deleteProductionService(farmer_id, production_id);

  res.status(200).json("Successfully deleted production");
}

export async function getAllPendingProductions(req, res, next) {
  try {
    const productions = await productionService.getAllPendingProductions();
    return res.json(productions);
  } catch (err) {
    next(err);
  }
}

export async function blockProduction(req, res, next) {
  try {
    const production = await productionService.blockProduction(
      req.params.production_id
    );
    return res.json({
      message: "Production blocked successfully",
      production,
    });
  } catch (err) {
    next(err);
  }
}

export async function getProductionsByFarmerId(req, res, next) {
  try {
    const productions = await productionService.getProductionsByFarmerId(
      req.params.farmer_id
    );
    return res.json(productions);
  } catch (err) {
    next(err);
  }
}

export async function getProductionsByRoute(req, res, next) {
  try {
    const productions = await productionService.getProductionsByRoute(
      parseInt(req.params.route)
    );
    return res.json(productions);
  } catch (err) {
    next(err);
  }
}
