import { createWebHistory, createRouter } from 'vue-router'
import LoginView from './views/Login.vue';
import ChatView from './views/Chat.vue';
import RegisterView from './views/Register.vue';
import profileView from './views/auth/profile/Index.vue';
import EditProfileView from './views/auth/profile/Edit.vue';
// import { store } from './utils/store'
import { useStore } from '@/store';
import ProfileView from './views/auth/profile/Index.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    component: RegisterView,
    meta: { requiresGuest: true }
  },
  {
    path: '/chat',
    component: ChatView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/:username',
    name: 'UserProfile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/edit',
    component: EditProfileView,
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const store = useStore()

  if (!store.user && !store.isLoading) {
    await store.fetchUser()
  }

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next('/')
  }
  else if (to.meta.requiresGuest && store.isAuthenticated) {
    next('/chat')
  }
  else {
    next()
  }
})