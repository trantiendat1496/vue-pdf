import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: {
          base: '#2B5CAD',
          lighten1: '#DAE3F3',
        },
        secondary: {
          base: '#424242',
          lighten1: '#D9D9D9',
        },
        accent: '#82B1FF',
        //#region TAG COLORS
        accent1: '#BA1B1B',
        accent2: '#FF8A65',
        accent3: '#FFB74D',
        accent4: '#81C784',
        accent5: '#26C6DA',
        accent6: '#9575CD',
        accent7: '#A1887F',
        //#endregion
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        'v-footer': '#4472C4',
        black: '#001A43',
        lightgray: '#C4C4C4',
        gray: '#8F8F8F',
        deepOrange: '#FF8A65',
        brown: '#A1887F',
        orange: '#FFB74D',
        cyan: '#26C6DA',
        deepPurple: '#9575CD',
        background: '#F7F7FA',
        red: '#BA1B1B',
        green: '#81C784',
      },
    },
  },
})
