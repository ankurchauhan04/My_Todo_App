import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
import SignUp from '../Pages/SignUp.vue'
import HomePage from '../Pages/HomePage.vue'
import Login from '../Pages/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
