import { Router } from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.post("/:id/follow", requireAuth, async (req, res) => {
  const target = await User.findById(req.params.id);
  const me = await User.findById(req.user.id);
  if (!target || !me) return res.status(404).json({ message: "User not found" });
  const i = target.followers.findIndex(x => x.toString() === me._id.toString());
  if (i >= 0) { target.followers.splice(i, 1); me.following.pull(target._id); }
  else { target.followers.push(me._id); me.following.push(target._id); }
  await Promise.all([target.save(), me.save()]);
  res.json({ following: i < 0, followers: target.followers.length });
});

export default router;