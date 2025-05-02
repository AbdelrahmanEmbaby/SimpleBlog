import Post from "../models/Posts.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author_id', 'first_name last_name');
        res.status(200).json({ message: 'Posts found', data: posts });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author_id', 'first_name last_name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found', data: null });
        }
        res.status(200).json({ message: 'Post found', data: post });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch post', error: error.message });
    }
}

export const createPost = async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            author_id: req.user.id
        });
        res.status(201).json({ message: 'Post created successfully', data: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.id, author_id: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Post not found or not authorized',
                data: null
            });
        }

        res.status(200).json({ message: 'Post updated successfully', data: updatedPost });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update post', error: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({
            _id: req.params.id,
            author_id: req.user.id
        });

        if (!deletedPost) {
            return res.status(404).json({
                message: 'Post not found or not authorized',
                data: null
            });
        }

        res.status(200).json({ message: 'Post deleted successfully', data: deletedPost });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post', error: error.message });
    }
}

export const getPostsByUserId = async (req, res) => {
    try {
        const posts = await Post.find({ author_id: req.user.userId })
            .populate('author_id', 'first_name last_name');

        res.status(200).json({
            message: posts.length ? 'Posts found' : 'No posts found for this user',
            data: posts
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
}

export const getPostsByPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [posts, totalPosts] = await Promise.all([
            Post.find()
                .sort({ publish_date: -1 })
                .skip(skip)
                .limit(limit)
                .populate('author_id', 'first_name last_name'),
            Post.countDocuments()
        ]);

        const hasMore = skip + posts.length < totalPosts;

        res.status(200).json({
            message: 'Posts retrieved successfully',
            data: {
                posts,
                pagination: {
                    page,
                    limit,
                    totalPosts,
                    totalPages: Math.ceil(totalPosts / limit),
                    hasMore
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
}