export default defineNuxtPlugin(nuxtApp => {
   const { isLoggedIn } = useAuthStore()

   if (isLoggedIn) {
      useSocketStore().register()
   }

   useSocketConnection()
})