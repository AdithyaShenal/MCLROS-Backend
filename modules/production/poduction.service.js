import * as productionRepository from "./production.repository.js";
import mongoose from "mongoose";
import Production from "./production.model.js";
import Route from "../routing/routing.model.js";
import * as errors from "../../errors/errors.js";

export async function submitProduction(data) {
  const production = await productionRepository.submit(data);
  return production;
}

export async function getMyProductions(farmer_id) {
  return Production.find({
    "farmer._id": farmer_id,
    status: { $in: ["failed", "collected"] },
  }).sort({ createdAt: -1 });
}

// Update submitted product
export async function updateProductionService(
  farmer_id,
  production_id,
  volume
) {
  if (volume <= 0) throw new errors.BadRequestError("Volume cannot be 0");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find production first
    const production = await Production.findOne(
      { _id: production_id, "farmer._id": farmer_id },
      null,
      { session }
    );

    if (!production) {
      throw new Error("Production not found or farmer not authorized");
    }

    //  update only if collected
    if (production.status === "collected") {
      throw new errors.BadRequestError(
        "Cannot update production that is already collected"
      );
    }

    // Update production
    production.volume = volume;
    await production.save({ session });

    // Update route if exists
    const route = await Route.findOne(
      { "stops.production._id": production_id },
      null,
      { session }
    );

    if (route) {
      route.stops = route.stops.map((stop) => {
        if (stop.production?._id.toString() === production_id.toString()) {
          return { ...stop.toObject(), production: production.toObject() };
        }
        return stop;
      });

      await route.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return production;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}

// Delete (Cancel) submitted production
export async function deleteProductionService(farmer_id, production_id) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const production = await Production.findOne({ _id: production_id }, null, {
      session,
    });

    if (!production) {
      throw new errors.NotFoundError("Production not found");
    }

    if (production.status === "collected") {
      throw new errors.BadRequestError(
        "Collected production cannot be canceled"
      );
    }

    if (production.status === "failed") {
      throw new errors.BadRequestError("Production already canceled");
    }

    production.status = "failed";
    production.failure_reason = "Canceled by farmer";
    production.blocked = true;

    await production.save({ session });

    const route = await Route.findOne(
      { "stops.production._id": production_id },
      null,
      { session }
    );

    if (route) {
      route.stops = route.stops.map((stop) => {
        if (stop.production?._id.toString() === production_id.toString()) {
          return {
            ...stop.toObject(),
            production: production.toObject(),
          };
        }
        return stop;
      });

      await route.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}

export async function getAllPendingProductions() {
  const productions = await productionRepository.findAllPending();
  return productions;
}

export async function blockProduction(production_id) {
  const production = await productionRepository.findById(production_id);
  if (!production) throw new Error("Production record not found");

  if (production.status === "blocked") {
    throw new Error("Production is already blocked");
  }

  return productionRepository.updateStatus(production_id, "blocked");
}

export async function getProductionsByFarmerId(farmer_id) {
  const productions = await productionRepository.findByFarmerId(farmer_id);
  if (!productions || productions.length === 0)
    throw new Error("No production records found for this farmer");
  return productions;
}

export async function getProductionsByRoute(route) {
  const productions = await productionRepository.findByRoute(route);
  if (!productions || productions.length === 0)
    throw new Error("No production records found for this route");
  return productions;
}
