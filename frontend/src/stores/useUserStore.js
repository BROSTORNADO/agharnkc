import { create } from 'zustand';
import axios from '../lib/axios'; // Your axios instance

const useUserStore = create((set) => ({
  user: null, // Initial state
  error: null, // Error state

  register: async (userData) => {
    try {
      const response = await axios.post('/users/register', userData);

      // Set the user and clear error state
      set({ user: response.data, error: null });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Registration failed' });
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post('/users/login', userData);

      // Set the user and clear error state
      set({ user: response.data, error: null });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Invalid credentials' });
    }
  },

  logout: async () => {
    try {
      set({ user: null, error: null }); // Clear user and error state
    } catch (err) {
      set({ error: err.response?.data?.message || 'Logout failed' });
    }
  },
}));

export default useUserStore;

