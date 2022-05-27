import { datastoreRegister } from './plugins/datastore-register'
import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
import router from './router'
import vuetify from './plugins/vuetify'
import { pluginsRegister } from './plugins/plugins-register'
import { componentRegister } from './plugins/component-register'
import { directiveRegister } from './plugins/directive-register'
import { vueFilterRegister } from './plugins/vue-filter-register'
import { awsRegister } from './plugins/aws-register'
import VueApexCharts from 'vue-apexcharts'
import '@aws-amplify/ui-components'
import { applyPolyfills, defineCustomElements } from '@aws-amplify/ui-components/loader'

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

awsRegister()
datastoreRegister()
pluginsRegister()
componentRegister()
directiveRegister()
vueFilterRegister()
applyPolyfills().then(() => {
  defineCustomElements(window)
})
Vue.config.ignoredElements = [/amplify-\w*/]

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
