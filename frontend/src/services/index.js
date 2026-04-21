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

export const blogService = {
  getAll: (category) => api.get('/blog/' + (category ? `?category=${category}` : '')),
  getById: (id) => api.get(`/blog/${id}/`),
  getBySlug: (slug) => api.get(`/blog/?slug=${slug}`),
  create: (data) => api.post('/blog/', data),
  update: (id, data) => api.patch(`/blog/${id}/`, data),
  remove: (id) => api.delete(`/blog/${id}/`),
}

export const courseService = {
  getAll: (category) => api.get('/courses/' + (category ? `?category=${category}` : '')),
  getById: (id) => api.get(`/courses/${id}/`),
  create: (data) => api.post('/courses/', data),
  update: (id, data) => api.patch(`/courses/${id}/`, data),
  remove: (id) => api.delete(`/courses/${id}/`),
}

export const enquiryService = {
  submit: (data) => api.post('/contact/enquiries/', data),
  getAll: () => api.get('/contact/enquiries/'),
}

export const appointmentService = {
  book: (data) => api.post('/contact/appointments/', data),
  getAll: () => api.get('/contact/appointments/'),
  updateStatus: (id, status) => api.patch(`/contact/appointments/${id}/`, { status }),
}

