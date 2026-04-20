import api from './api'

export const studentService = {
  getAll: () => api.get('/students/'),
  getById: (id) => api.get(`/students/${id}/`),
  search: (studentId) => api.get(`/students/search/?student_id=${studentId}`),
  create: (data) => api.post('/students/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.patch(`/students/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/students/${id}/`),
}

export const facultyService = {
  getAll: () => api.get('/faculty/'),
  create: (data) => api.post('/faculty/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.patch(`/faculty/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/faculty/${id}/`),
}

export const galleryService = {
  getAll: () => api.get('/gallery/'),
  create: (data) => api.post('/gallery/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/gallery/${id}/`),
}

export const paymentService = {
  createOrder: (data) => api.post('/payments/create-order/', data),
  verifyPayment: (data) => api.post('/payments/verify/', data),
  getTransactions: (studentId) =>
    api.get('/payments/transactions/' + (studentId ? `?student_id=${studentId}` : '')),
}
