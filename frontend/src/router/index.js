import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import comps from './components'
const Welcome = () => import('@/components/Welcome')
const Login = () => import('@/components/auth/Login')
const Register = () => import('@/components/auth/Register')
const HelloWorld = () => import('@/components/_test/HelloWorld')
const test = () => import('@/components/_test/test')

// ROUTES
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      meta: { free: true },
      component: Welcome
    },
    {
      path: '/login',
      name: 'login',
      meta: { free: true },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: { free: true },
      component: Register
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      meta: { free: true },
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '*',
      redirect: { name: 'welcome' }
    }
  ]
})

// GLOBAL GUARD
// On effectue des actions avant de d'afficher une route
// Ici on verifie que l'utilisateur dispose d'un token valide
router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.free)) {
    if (!localStorage.getItem('token') && to.path !== '/welcome') {
      next('/welcome')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router


// #################  FOR COPY #################
// import HelloWorld from '@/components/HelloWorld'
// import test from '@/components/test'
// const HelloWorld = () => import('@/components/HelloWorld')
// const test = () => import('@/components/test')

// const AsyncComponent = () => ({
//   // The component to load (should be a Promise)
//   component: import('./MyComponent.vue'),
//   // A component to use while the async component is loading
//   loading: LoadingComponent,
//   // A component to use if the load fails
//   error: ErrorComponent,
//   // Delay before showing the loading component. Default: 200ms.
//   delay: 200,
//   // The error component will be displayed if a timeout is
//   // provided and exceeded. Default: Infinity.
//   timeout: 3000
// })