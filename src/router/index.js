import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: () => import('../views/Product.vue'),
    },
    {
      path: '/user-dashboard',
      name: 'UserDashboard',
      component: () => import('../views/user/UserDashboard.vue'),
      meta: {
        authRequired: true,
      },
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   const currentUser = fb.auth().currentUser || store.state.user
//   const authRequired = to.matched.some((record) => record.meta.authRequired)

//   if (authRequired && !currentUser) {
//     next({ name: 'Home' })
//   } else if (authRequired && currentUser && to.path !== '/user-dashboard') {
//     next({
//       path: '/user-dashboard',
//       replace: true,
//     })
//   } else {
//     next()
//   }
// })

export default router
