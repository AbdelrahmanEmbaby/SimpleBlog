import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getPostsByPage, getPost, createPost, updatePost, deletePost } from './utils/posts.util.js';
import { createUser } from './utils/users.util.js';
import { authUser } from './utils/users.util.js';
import { verifyToken } from './utils/auth.util.js';
import { deleteImage, upload, uploadImage } from './services/cloudinary.service.js';
import connectDB from './utils/db.util.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

app.get('/posts', getPostsByPage);

app.get('/posts/:id', getPost);

app.post('/posts', verifyToken, createPost);

app.put('/posts/:id', verifyToken, updatePost);

app.delete('/posts/:id', verifyToken, deletePost);

app.post('/posts/image', upload.single('image'), uploadImage);

app.delete('/posts/image/:public_id', deleteImage);

app.post('/user/register', createUser);

app.post('/user/login', authUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});