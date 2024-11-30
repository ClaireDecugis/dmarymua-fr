import express from "express";
const app = express();
const port = 3001;

import "./cronJobs.js";

app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});

app.listen(port, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
});
