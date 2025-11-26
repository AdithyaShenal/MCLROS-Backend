import express from "express";
import mongoose from "mongoose";
<<<<<<< Updated upstream
=======
import farmerRoutes from "./modules/farmer/farmer.routes.js"; 
import productionRoutes from "./modules/production/poduction.routes.js";

>>>>>>> Stashed changes
const app = express();

mongoose
  .connect("mongodb://localhost:27017/MCLROS_DB")
  .then(() => console.log("Successfully connected to mongoDB."))
  .catch((err) => console.log(err.message));

// Middlewares
app.use(express.json());

<<<<<<< Updated upstream
//Routes
=======

app.use("/api/farmer", farmerRoutes); 
app.use("/api/production", productionRoutes);
>>>>>>> Stashed changes

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
