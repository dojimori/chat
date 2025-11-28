import { createWebHistory, createRouter } from 'vue-router'
import LoginView from './views/login-view.vue';
import ChatView from './views/chat-view.vue';
import RegisterView from './views/register-view.vue';

const routes = [
    { path: '/', name: "login", component: LoginView },
    { path: '/register', component: RegisterView },
    { 
        path: '/chat', 
        component: ChatView,
        // beforeEnter: (to, from, next) => {
        //     const name = localStorage.getItem('user') 
        //     if (!name) next ('/');
        //     else next();
        // }
    },

];

export const router = createRouter({
    history: createWebHistory(),
    routes 
})