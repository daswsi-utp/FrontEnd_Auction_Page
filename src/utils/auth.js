// src/utils/auth.js
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('auctionUser');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUserInfoFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica JWT
    return payload;
  } catch (e) {
    console.error("Error al decodificar el token", e);
    return null;
  }
};