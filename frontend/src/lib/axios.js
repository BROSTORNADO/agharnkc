// lib/axios.js
import axios from 'axios'

// 🚀 Always use your Render backend URL in production
const instance = axios.create({
  baseURL: 'https://agharnkc.onrender.com/api',
  withCredentials: true,
})

// ✅ Automatically attach token if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
