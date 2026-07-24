import api from './api';

export const getStudents = () => api.get('/students/students/');
export const getStudent = (id) => api.get(`/students/students/${id}/`);
export const createStudent = (data) => api.post('/students/students/', data);
export const updateStudent = (id, data) => api.put(`/students/students/${id}/`, data);
export const deleteStudent = (id) => api.delete(`/students/students/${id}/`);