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
    redirect: { name: 'Characters' },
    component: () => import('@/views/Wrapper.vue'),
    children: [
      {
        path: 'characters',
        name: 'Characters',
        component: () => import('@/views/Characters.vue')
      },
      {
        path: 'character',
        name: 'Character',
        component: () => import('@/views/Character.vue')
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
  else next()
})

export default router
