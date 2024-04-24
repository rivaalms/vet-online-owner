import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/util/colors'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin(({ vueApp }) => {
   const vuetify = createVuetify({
      theme: {
         defaultTheme: 'light',
         themes: {
            light: {
               dark: false,
               colors: {
                  primary: colors.green.base,
               }
            }
         }
      },
      defaults: {
         VTextField: {
            color: 'primary',
            density: 'comfortable',
            hideDetails: 'auto'
         },
         VBtn: {
            color: 'primary',
            class: 'text-capitalize',
            variant: 'flat'
         }
      }
   })

   vueApp.use(vuetify)
})