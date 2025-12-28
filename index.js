import express from "express";
import mongoose from "mongoose";

// Route imports
import farmerRoutes from "./modules/farmer/farmer.routes.js";
import productionRoutes from "./modules/production/poduction.routes.js";
import routing from "./modules/routing/routing.routes.js";
import fleetRoutes from "./modules/fleet/fleet.routes.js";
import driverRoutes from "./modules/driver/driver.routes.js";
import analyticsRoutes from "./modules/analytics/analaytics.routes.js";
import farmerAuth from "./modules/user/farmer/farmer.login.js";

// Middleware import
import cookieParser from "cookie-parser";
import morgan from "morgan";
import err from "./middleware/error.js";
import cors from "cors";

const app = express();

// DB Connection

mongoose
  .connect(
    // 'mongodb://localhost:27017/MCLROS_DB'
    "mongodb+srv://washenal55:washenal_admin@mycluster.ja90lnb.mongodb.net/MCLROS?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

//Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "capacitor://localhost",
      "http://localhost",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth/farmer", farmerAuth);
app.use("/api/farmer", farmerRoutes);
app.use("/api/trucks", fleetRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/routing", routing);
app.use("/api/analytics", analyticsRoutes);

app.use((req, res, next) => {
  res.status(201).json("Hello this is MCLROS System");
});

app.use(err);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
