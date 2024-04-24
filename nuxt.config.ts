// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
   devtools: { enabled: false },

   devServer: {
      port: 3080
   },

   build: {
      transpile: ['vuetify']
   },

   css: [
      '~/assets/css/base.css'
   ],

   modules: [
      (_options, nuxt) => {
         nuxt.hooks.hook('vite:extendConfig', (config) => {
            config.plugins?.push(vuetify({ autoImport: true }))
         })
      },
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      'dayjs-nuxt'
   ],

   vite: {
      vue: {
         template: {
            transformAssetUrls
         }
      }
   }
});
