import axios from 'axios'

// Cấu hình base URL từ biến môi trường
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Tạo axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor để thêm token vào header nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Products API
export const productsAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getById: (id: string | number) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string | number, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string | number) => api.delete(`/products/${id}`),
}

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id: string | number) => api.get(`/categories/${id}`),
  create: (data: any) => api.post('/categories', data),
  update: (id: string | number, data: any) => api.put(`/categories/${id}`, data),
  delete: (id: string | number) => api.delete(`/categories/${id}`),
}

// Orders API
export const ordersAPI = {
  getAll: (params?: any) => api.get('/orders', { params }),
  getById: (id: string | number) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  update: (id: string | number, data: any) => api.put(`/orders/${id}`, data),
  updateStatus: (id: string | number, status: string) => 
    api.patch(`/orders/${id}/status`, { status }),
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
}

// Customers API
export const customersAPI = {
  getAll: () => api.get('/customers'),
  getById: (id: string | number) => api.get(`/customers/${id}`),
  update: (id: string | number, data: any) => api.put(`/customers/${id}`, data),
}