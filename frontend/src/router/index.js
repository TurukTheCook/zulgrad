import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import comps from './components'
// const Welcome = () => import('@/components/Welcome')
// const Login = () => import('@/components/auth/Login')
// const Register = () => import('@/components/auth/Register')
// const HelloWorld = () => import('@/components/_test/HelloWorld')
// const test = () => import('@/components/_test/test')

function loadComp(component) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${component}.vue`)
}

// ROUTES
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      meta: { free: true },
      component: loadComp('Welcome')
    },
    {
      path: '/login',
      name: 'login',
      meta: { free: true },
      component: loadComp('auth/Login')
    },
    {
      path: '/register',
      name: 'register',
      meta: { free: true },
      component: loadComp('auth/Register')
    },
    {
      path: '/home',
      component: loadComp('home/Home'),
      children: [
        {
          path: '',
          name: 'modules',
          props: true,
          component: loadComp('home/Modules')
        },
        {
          path: 'profile',
          name: 'profile',
          component: loadComp('home/Profile')
        },
        {
          path: 'about',
          name: 'about',
          component: loadComp('home/About')
        },
        {
          path: 'history',
          name: 'history',
          component: loadComp('home/History')
        },
        {
          path: 'favs',
          name: 'favs',
          component: loadComp('home/Favs')
        },
        {
          path: 'modules',
          component: loadComp('home/modulesManagement/Home'),
          children: [
            {
              path: '',
              name: 'modules.manage',
              props: true,
              component: loadComp('home/modulesManagement/Manage')
            },
            {
              path: 'newmodule',
              name: 'modules.add',
              component: loadComp('home/modulesManagement/Add')
            },
            {
              path: 'newgroup',
              name: 'groups.add',
              component: loadComp('home/modulesManagement/AddGroup')
            }
          ]
        }
      ]
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
    if (!localStorage.getItem('X-Token') && to.path !== '/welcome') {
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