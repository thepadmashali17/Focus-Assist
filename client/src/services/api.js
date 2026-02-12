import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data)
};

// Tasks API
export const tasksAPI = {
    create: (data) => api.post('/tasks', data),
    getTodayTasks: () => api.get('/tasks/today'),
    complete: (id) => api.patch(`/tasks/${id}`),
    delete: (id) => api.delete(`/tasks/${id}`)
};

// User API
export const userAPI = {
    getProfile: () => api.get('/user/profile'),
    completeFocus: () => api.post('/user/focus-complete')
};

export default api;
