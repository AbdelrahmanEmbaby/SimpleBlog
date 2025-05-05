const apiBaseUrl = process.env.NODE_ENV === 'production'
    ? process.env.BACKEND_URL
    : '/api';

export const register = async (user) => {
    try {
        const response = await fetch(`${apiBaseUrl}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await fetch(`${apiBaseUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};