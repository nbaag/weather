import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from '@/views/Home.vue'
import About from '@/views/MyAbout.vue'
import Month from '@/views/Month.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name:'Home', component: Home},
    {path: '/about', name:'About', component: About},
    {path: '/month', name:'Month', component: Month},

  ]
})
createApp(App)
.use(router)
.mount('#app')
