import api from './api';

// Get all questions with search, filter, and pagination
export const getAllQuestions = async (params) => {
  const response = await api.get('/questions', { params });
  return response.data;
};

// Get single question by ID
export const getQuestionById = async (id) => {
  const response = await api.get(`/questions/${id}`);
  return response.data;
};

// Add new question (admin only)
export const addQuestion = async (questionData) => {
  const response = await api.post('/questions', questionData);
  return response.data;
};

// Update question (admin only)
export const updateQuestion = async (id, questionData) => {
  const response = await api.put(`/questions/${id}`, questionData);
  return response.data;
};

// Delete question (admin only)
export const deleteQuestion = async (id) => {
  const response = await api.delete(`/questions/${id}`);
  return response.data;
};