import { createMemoryHistory, createRouter } from 'vue-router'
import LoginView from './views/login-view.vue';
import ChatView from './views/chat-view.vue';

const routes = [
    { path: '/', component: LoginView },
    { path: '/chat', component: ChatView },

];

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})