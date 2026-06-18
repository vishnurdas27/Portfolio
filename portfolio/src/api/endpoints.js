import api from './client.js';

/* ---------- Public ---------- */
export const getProfile = () => api.get('/profile').then((r) => r.data);
export const getProjects = () => api.get('/projects').then((r) => r.data);
export const getAchievements = () => api.get('/achievements').then((r) => r.data);
export const sendMessage = (payload) => api.post('/contact', payload).then((r) => r.data);

/* ---------- Auth ---------- */
export const loginRequest = (payload) => api.post('/auth/login', payload).then((r) => r.data);
export const fetchMe = () => api.get('/auth/me').then((r) => r.data);

/* ---------- Admin: profile ---------- */
export const updateProfile = (payload) => api.put('/profile', payload).then((r) => r.data);

/* ---------- Admin: projects ---------- */
export const createProject = (payload) => api.post('/projects', payload).then((r) => r.data);
export const updateProject = (id, payload) =>
  api.put(`/projects/${id}`, payload).then((r) => r.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data);

/* ---------- Admin: achievements ---------- */
export const createAchievement = (payload) =>
  api.post('/achievements', payload).then((r) => r.data);
export const updateAchievement = (id, payload) =>
  api.put(`/achievements/${id}`, payload).then((r) => r.data);
export const deleteAchievement = (id) => api.delete(`/achievements/${id}`).then((r) => r.data);

/* ---------- Admin: messages ---------- */
export const getMessages = () => api.get('/messages').then((r) => r.data);
export const markMessageRead = (id, read = true) =>
  api.patch(`/messages/${id}/read`, { read }).then((r) => r.data);
export const deleteMessage = (id) => api.delete(`/messages/${id}`).then((r) => r.data);

/* ---------- Admin: image upload ---------- */
export const uploadImage = (file) => {
  const form = new FormData();
  form.append('image', file);
  return api
    .post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);
};
