import api from './api';

export const login = (username, password) => {
  return api.post('/token/', { username, password });
};

export const getUserProfile = () => {
  const username = localStorage.getItem('username') || 'User';
  return Promise.resolve({ data: { username } });
};
