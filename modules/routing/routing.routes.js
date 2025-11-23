import axios from "axios";
import express from "express";
import Route from "./routing.model.js";

const router = express.Router();

const sampleData = {
  locations: [
    { production_id: 0, lat: 6.9271, lon: 79.8612, volume: 120 },
    { production_id: 1, lat: 6.9934, lon: 80.0536, volume: 80 },
    { production_id: 2, lat: 7.2906, lon: 80.6337, volume: 150 },
    { production_id: 3, lat: 6.9275, lon: 79.862, volume: 90 },
    { production_id: 4, lat: 7.0101, lon: 80.05, volume: 110 },
    { production_id: 5, lat: 6.901, lon: 79.861, volume: 200 },
    { production_id: 6, lat: 7.123, lon: 80.2345, volume: 70 },
    { production_id: 7, lat: 6.998, lon: 80.45, volume: 130 },
    { production_id: 8, lat: 7.05, lon: 80.22, volume: 60 },
    { production_id: 9, lat: 6.95, lon: 79.9, volume: 140 },
    { production_id: 10, lat: 6.92, lon: 79.88, volume: 100 },
    { production_id: 11, lat: 7.1, lon: 80.6, volume: 180 },
    { production_id: 12, lat: 7.03, lon: 80.4, volume: 90 },
    { production_id: 13, lat: 6.98, lon: 79.95, volume: 120 },
    { production_id: 14, lat: 7.2, lon: 80.5, volume: 110 },
    { production_id: 15, lat: 6.97, lon: 79.87, volume: 130 },
    { production_id: 16, lat: 7.15, lon: 80.3, volume: 160 },
    { production_id: 17, lat: 6.94, lon: 79.89, volume: 75 },
    { production_id: 18, lat: 7.18, lon: 80.45, volume: 95 },
    { production_id: 19, lat: 6.96, lon: 79.92, volume: 85 },
  ],
  vehicles: [
    { id: 0, capacity: 1000 },
    { id: 1, capacity: 1000 },
    { id: 2, capacity: 1000 },
    { id: 3, capacity: 1000 },
  ],
};

// Admin Request VRP (Optimized Paths)
router.get("/routing/optimize", async (req, res) => {
  try {
    const vrpResponse = await axios.post(
      "http://localhost/python-server/testing",
      sampleData
    );

    const optimizedRoutes = vrpResponse.data.routes; // expected array of routes

    const allProductions = await Production.find(); // fetch all productions from DB

    const routesToSave = optimizedRoutes.map((route) => {
      const stopsWithProduction = route.stops.map((stop) => {
        const prod = allProductions.find(
          (p) =>
            p._id.toString() === stop.pro_id.toString() ||
            p.production_id == stop.pro_id
        );

        if (!prod) throw new Error(`Production ID ${stop.pro_id} not found`);

        return {
          order: stop.order,
          lat: stop.lat,
          lon: stop.lon,
          production: {
            _id: prod._id,
            farmer_name: prod.farmer_name,
            farmer_id: prod.farmer_id,
            volume: prod.volume,
            registration_time: prod.registration_time,
            location: prod.location,
            status: prod.status,
          },
        };
      });

      return {
        vehicle_id: route.vehicle_id,
        stops: stopsWithProduction,
      };
    });

    const savedRoutes = await Route.insertMany(routesToSave);

    res.json(savedRoutes);
  } catch (err) {
    console.error("Error optimizing routes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Driver fetches assigned route
router.get("/routing/today", (req, res) => {});
