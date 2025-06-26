import { create } from 'zustand';
import axios from '../lib/axios'; // Your axios instance

const useUserStore = create((set) => ({
  user: null,
  error: null,

  register: async (userData) => {
    try {
      const { data } = await axios.post('/users/register', userData);

      // Save token and set header
      const token = data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Optionally fetch user profile from backend
      const { data: userProfile } = await axios.get('/users/profile'); // Update based on your API
      set({ user: { ...userProfile, token }, error: null });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Registration failed' });
    }
  },

  login: async (userData) => {
  try {
    // Login request
    const { data } = await axios.post('/users/login', userData);
    
    // Get token from response
    const token = data.token;
    
    // Store token in localStorage
    localStorage.setItem('token', token);

    // Set Authorization header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Set user data from login response (includes id, name, email)
    set({ user: { id: data.id, name: data.name, email: data.email, token }, error: null });

    // Optionally, fetch full profile if needed
    // const { data: userProfile } = await axios.get('/users/profile');
    // set({ user: { ...userProfile, token }, error: null });

  } catch (err) {
    set({ error: err.response?.data?.message || 'Invalid credentials' });
  }
},

  logout: async () => {
    try {
      // Optionally call backend logout
      await axios.post('/users/logout');

      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      set({ user: null, error: null });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Logout failed' });
    }
  },

  init: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const { data: userProfile } = await axios.get('/users/profile'); // Adjust if needed
        set({ user: { ...userProfile, token }, error: null });
      } catch (err) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        set({ user: null, error: 'Session expired. Please log in again.' });
      }
    }
  },
}));

export default useUserStore;

