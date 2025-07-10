// lib/axios.js
import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : (import.meta.env.VITE_BACKEND_URL || 'https://agharnkc.onrender.com/api');

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

const token = localStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;

