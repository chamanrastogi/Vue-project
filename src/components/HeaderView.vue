
<script setup>
import { RouterLink,useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore()
const isLoggedIn = authStore.isLoggedIn()
const user = authStore.user
const router = useRouter()
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login') // Redirect to login page after logout
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
<template>

<div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a class="navbar-brand" href="#">Navbar</a>
      </div>      
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li class="nav-item">          
          <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
        </li>
        <li class="nav-item">        
            <RouterLink class="nav-link" to="/about">About</RouterLink>
        </li>   
        <li class="nav-item">          
          <RouterLink to="/post" class="nav-link active" aria-current="page">Post</RouterLink>
        </li>     
      </ul>
      <div class="col-md-3 text-end" v-if="!isLoggedIn">
        <RouterLink type="button" to="/login" class="btn btn-outline-primary me-2">Login</RouterLink>
        <RouterLink type="button" to="/register" class="btn btn-primary">Sign-up</RouterLink>
      </div>
      <div class="col-md-3 text-end" v-if="isLoggedIn">
        
        <button @click="handleLogout" class="btn btn-outline-primary me-2">Logout</button>
       
      </div>
    </header>
  </div>
 
</template>
