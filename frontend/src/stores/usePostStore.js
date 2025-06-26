import { create } from 'zustand'
import axios from 'axios'

// Base URL
const BASE_URL = 'https://agharnkc.onrender.com/api'

const usePostStore = create((set) => ({
  posts: [],
  error: null,
  loading: false,

  clearError: () => set({ error: null }),

  fetchPosts: async () => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      set({ posts: data, loading: false })
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching posts',
        loading: false,
      })
    }
  },

  fetchUserPosts: async () => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${BASE_URL}/posts/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      set({ posts: data, loading: false })
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        set({
          error: 'Session expired. Please log in again.',
          posts: [],
          loading: false,
        })
        window.location.href = '/login'
      } else {
        set({
          error: error.response?.data?.message || 'Error fetching user posts',
          loading: false,
        })
      }
    }
  },

  createPost: async (formData) => {
    set({ error: null })
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      set((state) => ({ posts: [data, ...state.posts] }))
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        set({ error: 'Session expired. Please log in again.', posts: [] })
        window.location.href = '/login'
      } else {
        set({ error: error.response?.data?.message || 'Error creating post' })
      }
      throw error
    }
  },

  deletePost: async (postId) => {
    set({ error: null })
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })

      if (response.status === 200 || response.status === 204) {
        set((state) => ({
          posts: state.posts.filter((post) => post._id !== postId),
        }))
      } else {
        set({ error: 'Failed to delete the post. Try again.' })
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        set({ error: 'Session expired. Please log in again.', posts: [] })
        window.location.href = '/login'
      } else {
        set({
          error: error.response?.data?.message || 'Error deleting post. Please try again.',
        })
      }
    }
  },
}))

export default usePostStore
