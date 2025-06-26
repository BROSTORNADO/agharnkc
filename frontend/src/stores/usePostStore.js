import { create } from 'zustand'
import axios from '../lib/axios' // Custom axios instance

// Setup: Set Authorization header globally if token exists
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const usePostStore = create((set) => ({
  posts: [],
  error: null,
  loading: false,

  // Clear errors (useful for forms or on navigation)
  clearError: () => set({ error: null }),

  // Fetch all posts
  fetchPosts: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get('/api/posts')
      set({ posts: data, loading: false })
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching posts',
        loading: false,
      })
    }
  },

  // Fetch posts created by the logged-in user
  fetchUserPosts: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get('/posts/user')
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

  // Create a new post
  createPost: async (formData) => {
    set({ error: null })
    try {
      const { data } = await axios.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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

  // Delete a post by ID
  deletePost: async (postId) => {
    set({ error: null })
    try {
      const response = await axios.delete(`/posts/${postId}`)

      if (response.status === 200 || response.status === 204) {
        set((state) => ({
          posts: state.posts.filter((post) => post._id !== postId),
        }))
      } else {
        set({ error: 'Failed to delete the post. Try again.' })
      }
    } catch (error) {
      console.error('Delete Post Error:', error)

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
;
export default usePostStore

