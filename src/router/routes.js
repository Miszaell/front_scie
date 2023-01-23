
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/page1', component: () => import('pages/page1.vue') },
      { path: 'page2', component: () => import('pages/page2.vue') },
      { path: '/page3', component: () => import('pages/page3.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
