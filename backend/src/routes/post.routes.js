import express from "express";
import { createPost, getFeed } from "../controllers/post.controllers.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { toggleLikePost } from "../controllers/post.controllers.js";
import { addComment } from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getFeed);
router.post("/:postId/like", verifyToken, toggleLikePost);
router.post("/:postId/comment", verifyToken, addComment);

export default router;
