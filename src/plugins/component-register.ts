import Vue from 'vue'

export const componentRegister = () => {
  Vue.component('snack-bar', () => import('@/components/snack-bar/snack-bar.vue'))
  Vue.component('alert', () => import('@/components/alert/alert.vue'))
  Vue.component('global-loading', () => import('@/components/global-loading/global-loading.vue'))
}
