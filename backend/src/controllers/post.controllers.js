import { Post } from "../models/post.models.js";

export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    const userId = req.user.id; // from JWT middleware

    if (!text && !image) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    const post = await Post.create({
      text,
      image,
      user: userId,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//createPost
export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email")
      .populate("likes", "username")
      .populate("comments.user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Feed fetched successfully",
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId);
      await post.save();
      return res.status(200).json({ message: "Post unliked" });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post liked" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//like/unlike
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: userId,
      text,
    });

    await post.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
