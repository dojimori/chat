import { createApp } from 'vue'
import App from './App.vue'
import './app.css'
import { MotionPlugin } from '@vueuse/motion'
import { router } from './router'

createApp(App)
.use(MotionPlugin)
.use(router)
.mount('#app')
