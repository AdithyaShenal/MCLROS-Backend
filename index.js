import express from "express";
import mongoose from "mongoose";

// Route imports
import farmerRoutes from "./modules/farmer/farmer.routes.js";
import productionRoutes from "./modules/production/poduction.routes.js";
import farmerReportRoutes from "./modules/farmerReport/f_r.routes.js";
import routing from "./modules/routing/routing.routes.js";
import fleetRoutes from "./modules/fleet/fleet.routes.js";
import driverRoutes from "./modules/driver/driver.routes.js";
import analyticsRoutes from "./modules/analytics/analaytics.routes.js";
import farmerAuth from "./modules/user/farmer/farmer.login.js";
import driverAuth from "./modules/user/driver/driver.login.js";
import configRoutes from "./modules/config/config.routes.js";
import adminRoutes from "./modules/user/admin/admin.login.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";

// Middleware import
// import cookieParser from "cookie-parser";
import morgan from "morgan";
import err from "./middleware/error.js";
import cors from "cors";

const app = express();

// DB Connection

mongoose
  .connect(
    // 'mongodb://localhost:27017/MCLROS_DB'
    "mongodb+srv://washenal55:washenal_admin@mycluster.ja90lnb.mongodb.net/MCLROS?retryWrites=true&w=majority",
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

//Middlewares
app.use(morgan("tiny"));
app.use(express.json());
// app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://localhost",
      "http://localhost:5175",
      "http://localhost:5174",
      "http://localhost:5173",
      "http://localhost",
      "capacitor://localhost",
      "https://mclros-backend-2.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Routes
app.use("/api/auth/admin", adminRoutes);
app.use("/api/auth/driver", driverAuth);
app.use("/api/auth/farmer", farmerAuth);
app.use("/api/farmer", farmerRoutes);
app.use("/api/trucks", fleetRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/reports", farmerReportRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/routing", routing);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/config", configRoutes);
app.use("/api/analytics", dashboardRoutes);

// app.use((req, res, next) => {
//   res.status(201).json("Hello this is MCLROS System");
// });

app.use(err);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
