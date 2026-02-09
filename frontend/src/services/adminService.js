import api from './api';

// Admin login
export const loginAdmin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

// Get admin profile (verify token)
export const getAdminProfile = async () => {
  const response = await api.get('/admin/profile');
  return response.data;
};

// Get dashboard analytics
export const getDashboardAnalytics = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};