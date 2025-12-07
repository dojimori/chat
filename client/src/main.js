import { createApp } from 'vue'
import App from './App.vue'
import './app.css'
import { MotionPlugin } from '@vueuse/motion'
import { router } from './router'
import { createStore } from 'vuex'
import userApi from './utils/api/user.api'

const store = createStore({
    state() {
        return {
            user: null
        }
    },

    mutations: {
        setUser(state, value) {
            state.user = value;
        }
    },

    actions: {
        async fetchUser({ commit }, value) {
            const user = await userApi.getMe();
            commit('setUser', user);
        }
    }
})


createApp(App)
.use(MotionPlugin)
.use(store)
.use(router)
.mount('#app')
