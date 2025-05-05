export const getPostsByPage = async (page, limit) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/posts?page=${page}&limit=${limit}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
};

export const getPostByID = async (id) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/posts/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch post:", error);
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
};

export const createPost = async (post) => {
    try {
        const userData = localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        const response = await fetch(`${process.env.BACKEND_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(post),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create post');
        }

        return await response.json();
    } catch (error) {
        console.error('Create post error:', error);
        throw error;
    }
};

export const updatePost = async (id, post) => {
    try {
        console.log("updating")
        const userData = localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        const response = await fetch(`${process.env.BACKEND_URL}/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(post),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update post');
        }

        return await response.json();
    } catch (error) {
        console.error('Update post error:', error);
        throw error;
    }
};

export const deletePost = async (id) => {
    try {
        const userData = localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        const response = await fetch(`${process.env.BACKEND_URL}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete post');
        }

        return await response.json();
    } catch (error) {
        console.error('Delete post error:', error);
        throw error;
    }
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('${process.env.BACKEND_URL}/posts/image', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};

export const deleteImage = async (publicId) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/posts/image/${publicId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
};