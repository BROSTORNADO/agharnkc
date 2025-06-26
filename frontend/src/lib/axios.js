// lib/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://agharnkc.onrender.com/api', // ✅ Direct URL
  withCredentials: true,
})

// Add token if available
const token = localStorage.getItem('token')
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
