// src/app/utils/auth.js

import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => !!getToken();

export const getUserInfoFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      email: decoded.sub,
      exp: decoded.exp
    };
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};