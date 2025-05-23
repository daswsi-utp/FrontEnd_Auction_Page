// src/lib/axiosUsuario.js
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // URL base del backend

const axiosUsuario = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token en cada solicitud
axiosUsuario.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosUsuario;