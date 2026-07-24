import api from './api';

export const getSubjects = () => api.get('/subjects/subjects/');
export const getSubject = (id) => api.get(`/subjects/subjects/${id}/`);
export const createSubject = (data) => api.post('/subjects/subjects/', data);
export const updateSubject = (id, data) => api.put(`/subjects/subjects/${id}/`, data);
export const deleteSubject = (id) => api.delete(`/subjects/subjects/${id}/`);