import { get, isEmpty, isNumber } from 'lodash-es'
import Vue from 'vue'

export const pluginsRegister = () => {
  Vue.use({
    install: (Vue: any) => {
      Vue.prototype.$_empty = (any: any) => {
        return !isNumber(any) && (!any || isEmpty(any))
      }
      Vue.prototype.$_get = (any: any, path: string, defaultValue = '') => {
        return get(any, path, defaultValue)
      }
    },
  })
}
