import { createWebHistory, createRouter } from 'vue-router'
import LoginView from './views/login-view.vue';
import ChatView from './views/chat-view.vue';
import RegisterView from './views/register-view.vue';
import { getMe } from './utils/user';
import EditProfile from './views/edit-profile.vue';
const routes = [
    { path: '/', name: "login", component: LoginView },
    { path: '/register', component: RegisterView },
    { 
        path: '/chat', 
        component: ChatView,
        beforeEnter: async (to, from, next) => {
            // const name = localStorage.getItem('user') 
            const user = await getMe();
            // if (!name) next ('/');
            if (!user) next('')
            else next();
        }
    },
    { 
        path: '/edit-profile', 
        component: EditProfile,
        beforeEnter: async (to, from, next) => {
            // const name = localStorage.getItem('user') 
            const user = await getMe();
            // if (!name) next ('/');
            if (!user) next('')
            else next();
        }
    }

];

export const router = createRouter({
    history: createWebHistory(),
    routes 
})