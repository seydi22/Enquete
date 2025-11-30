import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createComparatif = (data) => {
  return apiClient.post('/comparatif', data);
};

export const createParticipative = (data) => {
  return apiClient.post('/participative', data);
};

export const getComparatifs = () => {
  return apiClient.get('/comparatif');
};

export const getComparatifById = (id) => {
  return apiClient.get(`/comparatif/${id}`);
};

export const updateComparatif = (id, data) => {
  return apiClient.put(`/comparatif/${id}`, data);
};

export const deleteComparatif = (id) => {
  return apiClient.delete(`/comparatif/${id}`);
};

export const getParticipatives = () => {
  return apiClient.get('/participative');
};

export const getParticipativeById = (id) => {
  return apiClient.get(`/participative/${id}`);
};

export const updateParticipative = (id, data) => {
  return apiClient.put(`/participative/${id}`, data);
};

export const deleteParticipative = (id) => {
  return apiClient.delete(`/participative/${id}`);
};

const api = {
  createComparatif,
  createParticipative,
  getComparatifs,
  getParticipatives,
  getParticipativeById,
  updateParticipative,
  deleteParticipative,
  getComparatifById,
  updateComparatif,
  deleteComparatif,
};

export default api;
