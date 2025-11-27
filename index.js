import express from "express";
import mongoose from "mongoose";
import farmerRoutes from "./modules/farmer/farmer.routes.js"; 

const app = express();


mongoose
  .connect("mongodb://localhost:27017/MCLROS_DB")
  .then(() => console.log("Successfully connected to mongoDB."))
  .catch((err) => console.log(err.message));


app.use(express.json());


app.use("/api/farmer", farmerRoutes); 

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
