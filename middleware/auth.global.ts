export default defineNuxtRouteMiddleware((to, from) => {
   const authStore = useAuthStore()
   const excludeRoute = ['/login']

   if (!authStore.isLoggedIn && !excludeRoute.includes(to.path)) {
      return navigateTo('/login')
   } else if (authStore.isLoggedIn && excludeRoute.includes(to.path)) {
      return navigateTo('/')
   }
})