// /frontend/lib/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://agharnkc.onrender.com/api', // Fixed to production backend
  withCredentials: true,
})

const token = localStorage.getItem('token')
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
