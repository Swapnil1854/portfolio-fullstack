import axios from 'axios';

const API_BASE = 'https://portfolio-fullstack-w1z9.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──
export const adminLogin = (credentials) => {
  console.log("SENDING DATA:", credentials);
  return api.post('/auth/login', credentials);
};

// ── Contact ──
export const submitContact = (data) => api.post('/contact', data);

// ── Admin Messages ──
export const getMessages = () => api.get('/admin/messages');
export const deleteMessage = (id) => api.delete(`/admin/messages/${id}`);

// ── Projects ──
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// ── Skills ──
export const getSkills = () => api.get('/skills');
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// ── Experience ──
export const getExperience = () => api.get('/experience');
export const createExperience = (data) => api.post('/experience', data);
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`);

// ── Certifications ──
export const getCertifications = () => api.get('/certifications');
export const createCertification = (data) => api.post('/certifications', data);
export const updateCertification = (id, data) => api.put(`/certifications/${id}`, data);
export const deleteCertification = (id) => api.delete(`/certifications/${id}`);

// ── Resume ──
export const getResumeUrl = () => `${API_BASE}/resume/download`;

export default api;