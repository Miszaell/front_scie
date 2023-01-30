import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth/authStore'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE)

  })
  // Router.beforeEach((to, from, next) => {
  //   const authStore = useAuthStore()
  //   if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.getIsAuthenticated) {
  //     next({
  //       path: "/login",
  //       query: { to: to.path }
  //     });
  //   } else {
  //     next();
  //   }
  // })

  return Router
})
