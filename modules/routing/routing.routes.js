import express from "express";
import axios from "axios";
import Production from "../production/production.model.js";

const router = express.Router();

// Admin Request VRP (Optimized Paths)
router.get("/optimize/auto", async (req, res) => {
  const vehicles = [
    { vehicle_id: 1, capacity: 15 },
    { vehicle_id: 2, capacity: 15 },
    { vehicle_id: 3, capacity: 15 },
    { vehicle_id: 4, capacity: 15 },
  ];

  const vehicle_capacities = [15, 15, 15, 15];
  const depot = { lat: 7.019041, lon: 79.969565 };

  const productions = await Production.find({
    blocked: false,
    status: "pending",
  });

  if (!productions)
    return res.status(201).json({
      success: true,
      message: "No pending productions available in this moment",
    });

  const coords = [[depot.lon, depot.lat]];
  const demands = [0];
  const productionIndexMap = [null];

  productions.forEach((prod) => {
    coords.push([prod.farmer.info.location.lon, prod.farmer.info.location.lat]);
    demands.push(prod.volume);
    productionIndexMap.push(prod);
  });

  try {
    const vrpResponse = await axios.post(
      "http://127.0.0.1:8000/route-optimize/auto",
      {
        coords,
        demands,
        vehicle_capacities,
      }
    );

    const routes = vrpResponse.data.routes;

    // Creating routes
    for (const route of routes) {
      route.vehicle_id = vehicles[route.vehicle_id].vehicle_id;

      let order = 1;
      const mappedStops = route.stops.map((stop) => {
        const p = productionIndexMap[stop.node];

        // console.log("Production ->", p);

        return {
          order: order++,
          node: stop.node,
          production: p
            ? {
                _id: p._id,
                volume: p.volume,
                farmer: p.farmer,
              }
            : null,
          load_after_visit: stop.load_after_visit,
        };
      });

      route.stops = mappedStops;
    }

    res.status(200).send(routes);
  } catch (err) {
    console.error("Error optimizing routes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Driver fetches assigned route
router.get("/routing/today", (req, res) => {});

export default router;
