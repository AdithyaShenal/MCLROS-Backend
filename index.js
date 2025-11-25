import express from "express";
import mongoose from "mongoose";
const app = express();

mongoose
  .connect("mongodb://localhost:27017/MCLROS_DB")
  .then(() => console.log("Successfully connected to mongoDB."))
  .catch((err) => console.log(err.message));

// Middlewares
app.use(express.json());

//Routes

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
