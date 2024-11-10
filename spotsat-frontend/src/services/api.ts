import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

// Intercepta as requisições para adicionar o token JWT
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (username: string, password: string) =>
    api.post('/login', { username, password });

export const createPolygon = (data: any) => api.post('/polygons', data);

export const fetchPolygons = () => api.get('/polygons');
export const fetchPolygonById = (id: string) => api.get(`/polygons/${id}`);
export const searchPolygonsByRadius = (latitude: number, longitude: number, radius: number) =>
    api.get(`/polygons/search`, { params: { latitude, longitude, radius } });

export const updatePolygon = (id: string, data: any) => api.put(`/polygons/${id}`, data);

export const deletePolygon = (id: string) => api.delete(`/polygons/${id}`);

export default api;
