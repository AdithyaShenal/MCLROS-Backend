import express from "express";
import mongoose from "mongoose";
import farmerRoutes from "./modules/farmer/farmer.routes.js";
import productionRoutes from "./modules/production/poduction.routes.js";
import routing from "./modules/routing/routing.routes.js";
import morgan from "morgan";
import err from "./middleware/error.js";
import cors from "cors";
import { RouteNotFoundError } from "./error/errors.js";

const app = express();

// DB Connection
mongoose
  .connect("mongodb://localhost:27017/MCLROS_DB")
  .then(() => console.log("Successfully connected to mongoDB."))
  .catch((err) => console.log(err.message));

//Middlewares
app.use(morgan("tiny"));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/farmer", farmerRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/routing", routing);

app.all("*", () => {
  throw new RouteNotFoundError();
});

app.use(err);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
