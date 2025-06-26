// lib/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'https://agharnkc.onrender.com', // replace with your Render URL
  withCredentials: true,
});

export default instance;
