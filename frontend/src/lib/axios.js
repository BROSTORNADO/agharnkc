// lib/axios.js
import axios from 'axios'

// Always use Render deployment as base URL
const instance = axios.create({
  baseURL: 'https://agharnkc.onrender.com/api', // ✅ Updated to your Render URL
  withCredentials: true, // optional, if backend uses cookies
})

// Automatically attach token on every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
