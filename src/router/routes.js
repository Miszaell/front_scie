
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/IndexPage.vue') },
      { path: '/page1', component: () => import('pages/page1.vue') },

      {
        path: '/nomina',
        component: () => import('pages/page2.vue'),
      },
      {
        path: '/presupuesto',
        component: () => import('pages/page1.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contabilidad',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: "pagos", path: 'pagos', component: () => import('pages/contabilidad/pagos.vue')
      }
    ]
  },
  {
    path: '/presupuesto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: "control-presupuestal", path: 'control-presupuestal', component: () => import('pages/presupuesto/ControlPresupuestal.vue')
      }
    ]
  },
  {
    path: '/inventario',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: "inventario", path: 'inventario', component: () => import('pages/inventario/Transferencias.vue')
      }
    ]
  },
  {
    path: '/resguardos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: "resguardos", path: 'resguardos', component: () => import('pages/resguardos/Resguardos.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
