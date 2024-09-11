import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostView from '../views/PostView.vue'
import { useAuthStore } from '../stores/authStore' // Import your Pinia store
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: PostView,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (authStore.token) {
        next()
      } else {
        next('/login') // Redirect to login if not authenticated
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },{
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
