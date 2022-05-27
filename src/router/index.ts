import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/',
    component: () => import('@/pages/auth-container.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login-page.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/pages/main-container.vue'),
    children: [
      {
        path: 'page-pdf',
        component: () => import('@/pages/brand-pdf-page.vue'),
      },
      {
        path: 'top',
        component: () => import('@/pages/top-page.vue'),
      },
      {
        path: 'top',
        component: () => import('@/pages/dashboard-page.vue'),
        children: [
          {
            path: 'brand-top/:brandCd',
            component: () => import('@/pages/brand-top-page.vue'),
          },
          {
            path: 'brand-governance/:brandCd',
            component: () => import('@/pages/brand-governance-page.vue'),
          },
          {
            path: 'brand-report-info/:brandCd',
            component: () => import('@/pages/brand-report-info-page.vue'),
          },
          {
            path: 'brand-public-report/:brandCd',
            component: () => import('@/pages/brand-public-report-page.vue'),
          },
          {
            path: 'brand-news-press/:brandCd',
            component: () => import('@/pages/brand-news-press-page.vue'),
          },
          {
            path: 'brand-officers/:brandCd',
            component: () => import('@/pages/brand-officers-page.vue'),
          },
          {
            path: 'brand-officers-info/:brandCd',
            component: () => import('@/pages/brand-officer-info.vue'),
          },
        ],
      },
      {
        path: 'profile/change-pass',
        component: () => import('@/pages/change-password-page.vue'),
      },
      {
        path: 'corporate-info/corporate-search',
        component: () => import('@/pages/corporate-search-page.vue'),
      },
      {
        path: 'company-top/basic-info',
        component: () => import('@/pages/basic-info-page.vue'),
      },
      {
        path: 'company-top/engagement',
        component: () => import('@/pages/engagement-page.vue'),
      },
      {
        path: 'company-top/exercise-voting',
        component: () => import('@/pages/exercise-voting-page.vue'),
      },
      {
        path: 'esg/esg-search',
        component: () => import('@/pages/esg-search-page.vue'),
      },
      {
        path: 'esg/competition',
        component: () => import('@/pages/competition-page.vue'),
      },
      {
        path: 'esg/time-series',
        component: () => import('@/pages/time-series-page.vue'),
      },

      {
        path: 'brand/:brandCd',
        component: () => import('@/pages/brand-detail-page.vue'),
      },
      {
        path: 'brand',
        component: () => import('@/pages/brand-page.vue'),
      },
      {
        path: 'officer',
        component: () => import('@/pages/officer-page.vue'),
      },
      {
        path: 'governance',
        component: () => import('@/pages/governance-page.vue'),
      },
      {
        path: 'report',
        component: () => import('@/pages/report-page.vue'),
      },
      {
        path: 'public-report',
        component: () => import('@/pages/public-report-page.vue'),
      },
      {
        path: 'esg-scoring',
        component: () => import('@/pages/esg-scoring-page.vue'),
      },
      {
        path: 'download',
        component: () => import('@/pages/download-page.vue'),
      },
      {
        path: 'settings-portfolio',
        component: () => import('@/pages/setting-portfolio-page.vue'),
      },
      {
        path: 'settings-eval',
        component: () => import('@/pages/settings-eval-page.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const authState = localStorage.getItem('authState')
  if (to.path !== '/login' && authState !== 'signedin') next({ path: '/login' })
  else next()
})

export default router
