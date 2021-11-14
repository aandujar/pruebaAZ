import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/wrapper',
    name: 'Wrapper',
    redirect: { name: 'Users' },
    component: () => import('@/views/Wrapper.vue'),
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/Users.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/User.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Register' && !store.getters.isUserLogged) next({ name: 'Register' })
  else if (to.name === 'Register' && store.getters.isUserLogged) next({ name: 'Wrapper' })
  else next()
})

export default router
