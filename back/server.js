// server.js

import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes, { initUserRoutes } from "./routes/userRoutes.js"; // Import des routes utilisateurs

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

let db;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb://mongo:27017/budgeat_db";
const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("DB Connected", uri);
    db = client.db("budgeat_db");

    // Initialiser les routes utilisateurs avec la connexion à la DB
    initUserRoutes(db);
  })
  .catch((err) => console.error(err));

// Route principale
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Budgeat !");
});

// Utiliser les routes utilisateurs
app.use("/api/users", userRoutes); // Ajouter le préfixe à toutes les routes utilisateurs

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
