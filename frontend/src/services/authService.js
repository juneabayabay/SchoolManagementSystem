import api from './api';

export const login = (username, password) => {
  return api.post('/token/', { username, password });
};

// Temporary mock – in production, create a /api/user/ endpoint
export const getUserProfile = () => {
  // For now, return a dummy user; you can also decode JWT or implement a real endpoint.
  return Promise.resolve({ data: { username: 'admin' } });
};