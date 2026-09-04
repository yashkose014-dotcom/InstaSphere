import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();
const sign = user => jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "username, email and password are required" });
    if (await User.findOne({ $or: [{ username }, { email }] })) return res.status(409).json({ message: "Username or email already exists" });
    const user = await User.create({ username, email, name, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ token: sign(user), user: { id: user._id, username: user.username, email: user.email, name: user.name } });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ $or: [{ email: login }, { username: login }] });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ token: sign(user), user: { id: user._id, username: user.username, email: user.email, name: user.name } });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

export default router;