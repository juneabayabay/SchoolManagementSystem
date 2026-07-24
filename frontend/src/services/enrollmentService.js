import api from './api';

export const getEnrollments = () => api.get('/enrollments/enrollments/');
export const createEnrollment = (data) => api.post('/enrollments/enrollments/', data);
export const deleteEnrollment = (id) => api.delete(`/enrollments/enrollments/${id}/`);