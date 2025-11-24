import { createWebHistory, createRouter } from 'vue-router'
import LoginView from './views/login-view.vue';
import ChatView from './views/chat-view.vue';

const routes = [
    { path: '/', component: LoginView },
    { 
        path: '/chat', 
        component: ChatView,
        beforeEnter: (to, from, next) => {
            const name = localStorage.getItem('username') 
            if (!name) next ('/');
            else next();
        }
    },

];

export const router = createRouter({
    history: createWebHistory(),
    routes 
})