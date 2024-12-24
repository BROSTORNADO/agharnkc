import { create } from 'zustand'
import axios from 'axios'

const usePostStore = create((set) => ({
  posts: [],
  error: null,
  loading: false,

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

  fetchUserPosts: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get('/api/posts/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      set({ posts: data, loading: false })
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching user posts',
        loading: false,
      })
    }
  },

  createPost: async (formData) => {
    set({ error: null })
    try {
      const { data } = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      set((state) => ({ posts: [data, ...state.posts] }))
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error creating post' })
      throw error
    }
  },

  deletePost: async (postId) => {
    set({ error: null })
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
      }))
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error deleting post' })
    }
  },
}))

export default usePostStore
