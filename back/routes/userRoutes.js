// routes/userRoutes.js

import express from "express";
import bcrypt from "bcryptjs";

const router = express.Router();
let db;

// Injecter la connexion à la base de données
export const initUserRoutes = (database) => {
  db = database;
};

// Récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Créer un utilisateur
router.post("/", async (req, res) => {
  const { username, password, email, dietary_preferences } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Username, password, and email are required" });
  }

  // Vérifier si l'email existe déjà
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists" });
  }

  // Hachage du mot de passe
  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = {
    username,
    password: hashedPassword,
    email,
    dietary_preferences,
    created_at: new Date(),
  };

  try {
    const result = await db.collection("users").insertOne(newUser);
    res
      .status(201)
      .json({ id: result.insertedId, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Connexion d'un utilisateur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
});

// Mettre à jour un utilisateur
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, email, dietary_preferences } = req.body;

  const updates = {};
  if (username) updates.username = username;
  if (email) {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(409).json({ error: "Email already exists" });
    }
    updates.email = email;
  }
  if (dietary_preferences) updates.dietary_preferences = dietary_preferences;

  try {
    const result = await db
      .collection("users")
      .updateOne(
        { _id: new require("mongodb").ObjectId(userId) },
        { $set: updates }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Supprimer un utilisateur
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await db
      .collection("users")
      .deleteOne({ _id: new require("mongodb").ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
