import express from "express";
import { apiRouter } from "./router/apiRouter.js";

const PORT = 8000;

const app = express()

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(401).json("Invalid Path")
});

app.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`)
});

