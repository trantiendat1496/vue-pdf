import moment from 'moment'
import Vue from 'vue'

export const vueFilterRegister = () => {
  Vue.filter('date', (isoStr: string, format: string) => (isoStr ? moment(isoStr).format(format) : ''))
  Vue.filter('yymmdd', (val: string) => (val ? moment(val, 'YYYY/MM/DD hh:mm:ss').format('YYYY/MM/DD') : ''))
  Vue.filter('mmdd', (val: string) => (val ? moment(val).format('MM/DD') : ''))
  Vue.filter('yymm', (val: string) => (val ? moment(val).format('YY/MM') : ''))
  Vue.filter('yyyymm', (val: string) => (val ? moment(val).format('YYYY/MM') : ''))
}
