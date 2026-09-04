import { Router } from "express";
import Post from "../models/Post.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const posts = await Post.find().populate("user", "username name avatar").sort({ createdAt: -1 }).limit(30);
    res.json(posts);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { media, caption, location, hashtags } = req.body;
    const post = await Post.create({ user: req.user.id, media, caption, location, hashtags });
    res.status(201).json(await post.populate("user", "username name avatar"));
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/:id/like", requireAuth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const index = post.likes.findIndex(id => id.toString() === req.user.id);
  if (index >= 0) post.likes.splice(index, 1); else post.likes.push(req.user.id);
  await post.save();
  res.json({ liked: index < 0, likes: post.likes.length });
});

router.post("/:id/comments", requireAuth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  post.comments.push({ user: req.user.id, text: req.body.text });
  await post.save();
  res.status(201).json(post.comments.at(-1));
});

export default router;