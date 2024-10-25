import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual API base URL
  timeout: 10000,
});

// Login function
export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const logout = async (token) => {
  const response = await apiClient.get('/auth/logout', { 
    headers: { Authorization: `Bearer ${token}` }
   });
  return response.data;
};
export const signup = async (username, email, password) => {
  const response = await apiClient.post('/auth/signup', { username, email, password });
  return response.data;
};

// Category CRUD operations
export const getUserDetails = async (token) => {
  const response = await apiClient.get('/auth/userdetails', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

