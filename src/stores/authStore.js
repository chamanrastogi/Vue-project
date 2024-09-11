// stores/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'


export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(null)
  const errors = ref([])
 

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const clearToken = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }
  const isLoggedIn = () => {
    return !!token.value
  }
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://tempo.test/api/auth/login', { email, password })
      setToken(response.data.access_token)
      user.value = response.data.user // Assuming the response contains user data
      return response
      
    } catch (error) {
      errors.value = ['Error logging in: ' + error.message]
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://tempo.test/api/auth/register', { name, email, password })
      setToken(response.data.access_token)
      user.value = response.data.user // Assuming the response contains user data
      return response
    } catch (error) {
      errors.value = ['Error registering: ' + error.message]
      throw error
    }
  }
// Logout function
const logout = async () => {
  try {
    //console.log(this.token.value)
    await axios.post('http://tempo.test/api/auth/logout') // Optional: Notify server about logout
    clearToken()
  } catch (error) {
    console.error('Error logging out:', error)
    clearToken() // Clear token regardless of server error
  }
}
  return {
    token,
    user,
    errors,
    setToken,
    clearToken,
    isLoggedIn,
    login,
    register,
    logout
  }
})
