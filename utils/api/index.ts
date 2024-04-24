type Options = {
   method: 'get' | 'post' | 'put' | 'delete'
   headers?: Wildcard
   params?: Wildcard
   query?: Wildcard
   body?: Wildcard
}

export const $api = async <T> (url: string, opts?: Options) : Promise <T> => {
   const store = useAppStore()
   const data = await $fetch <T> (url, {
      baseURL: useRuntimeConfig().public.apiUrl,
      ...opts,

      async onRequest({ options }) {
         const headers : Wildcard = {
            ...options.headers,
            Accept: 'application/json'
         }

         const { isLoggedIn, getToken } = useAuthStore()
         if (isLoggedIn) {
            headers.Authorization = `Bearer ${getToken}`
         }

         options.headers = headers
      },

      async onRequestError({ error }) {
         store.notify(error.message, 'error')
      },

      async onResponse({ response }) {
         return response._data
      },

      async onResponseError({ response }) {
         const { status, _data } = response

         if (status == 403) {
            return store.notify(`${status}: ${_data?.message}`, 'error')
         }

         const message = `${status}: ${_data?.message}`
         store.notify(message, 'error')

         if (status == 401) {
            useAuthStore().$reset()
            navigateTo(`/login`)
         }
      }
   })

   return data
}