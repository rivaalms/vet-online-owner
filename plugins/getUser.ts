export default defineNuxtPlugin(async (nuxtApp) => {
   const authStore = useAuthStore()
   const route = useRoute()
   const excludedRoute = ['/login']

   if (!excludedRoute.includes(route.path)) {
      await me()
         .then(resp => {
            authStore.user = resp
         })
         .catch((e) => {
            void(0)
         })
   }
})