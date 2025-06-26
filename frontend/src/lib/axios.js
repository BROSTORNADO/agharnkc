// lib/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://agharnkc.onrender.com/api', // 🔥 hardcoded, never localhost
  withCredentials: true,
})

// Add token on every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
