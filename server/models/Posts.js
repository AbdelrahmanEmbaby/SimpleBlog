import mongoose from 'mongoose';
import { User } from './index.js';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: { type: String },
    publish_date: { type: Date, default: Date.now },
    tags: [{ type: String }]
});

export default mongoose.model('Post', postSchema);