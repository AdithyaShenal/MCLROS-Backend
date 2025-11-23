import express from "express";
const app = express();

// Middlewares
app.use(express.json());

//Routes

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
