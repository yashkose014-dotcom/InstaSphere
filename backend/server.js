import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_, res) => res.json({ ok: true, service: "InstaSphere API" }));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
    .catch(err => { console.error("MongoDB connection failed:", err.message); app.listen(port, () => console.log(`API running without DB on http://localhost:${port}`)); });
} else {
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
}