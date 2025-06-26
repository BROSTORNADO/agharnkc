// lib/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://agharnkc.onrender.com/api', // ✅ Updated default URL
  withCredentials: true,
})

// Add token to headers if available
const token = localStorage.getItem('token')
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
