const express = require('express');
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page || "1", 10), 1);
        const limit = Math.max(Math.min(parseInt(req.query.limit || "5", 10), 50), 1);
        const skip = (page - 1) * limit;

        const [total, posts] = await Promise.all([
            Post.countDocuments(),
            Post.find()
                .populate("user", "username")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
        ]);

        return res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            posts
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: "title and content are required" });
        }

        const post = await Post.create({
            user: req.user.id,
            title,
            content
        });
        return res.status(201).json({ message: "Post created successfully", post });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (title) post.title = title;
        if (content) post.content = content;

        await post.save();
        return res.json({ message: "Post updated successfully", post });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await post.remove();
        return res.json({ message: "Post deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;