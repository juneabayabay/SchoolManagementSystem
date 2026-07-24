import api from './api';

export const getTeachers = () => api.get('/teachers/teachers/');
export const getTeacher = (id) => api.get(`/teachers/teachers/${id}/`);
export const createTeacher = (data) => api.post('/teachers/teachers/', data);
export const updateTeacher = (id, data) => api.put(`/teachers/teachers/${id}/`, data);
export const deleteTeacher = (id) => api.delete(`/teachers/teachers/${id}/`);